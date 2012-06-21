// Card Constructor
function Card(mysuit,mynumber) {
     var suit = mysuit;
     var number = mynumber;
    this.getNumber = function(){
        return number;
    };
    this.getSuit = function(){
        return suit;
    };
    this.getValue = function(){
        if(number > 10){
            return 10;
        }else if(number === 1){
            return 11;
        }else{
            return number;
        }
    };
}

/*
 * Add a shuffle function to Array object prototype
 * Usage : 
 *  var tmpArray = ["a", "b", "c", "d", "e"];
 *  tmpArray.shuffle();
 */
Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i === 0 ) return;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
};
var suits = ['Clubs','Hearts','Diamonds','Spades'];
var ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
var deck = [];

var newDeck = function(){
    for(var k=0;k<suits.length;k++){
        for(var i = 0;i<ranks.length;i++){
            var card = new Card(suits[k],ranks[i]);
            deck.push(card);
        }
    }
  //  deck.sort(function() {return 0.5 - Math.random();});
    deck.shuffle();
};

var deal = function(){
    if(letsPlay){
        if(deck.length<=4){
            if(confirm("Out of cards. Do you want another deck?")){
                newDeck();
                myCard = deck[0];
                deck.splice(0,1);
                return myCard;
            }else{
                letsPlay=false;
            }
        }else{
            myCard = deck[0];
            deck.splice(0,1);
            return myCard;
        }
    }
};

function Hand() {
    if(deck.length>0){
        var Cards=[];
        Cards[Cards.length] = deal();
        Cards[Cards.length] = deal();
        this.getHand = function(){
            return Cards;
        };
        this.score = function(){
            var totalScore = 0;
            for(i=0;i<Cards.length;i++){
                    totalScore = totalScore + Cards[i].getValue();
                }
            if(totalScore > 21){
                for(i=0;i<Cards.length;i++){
                    if(Cards[i].getValue()===11){
                        totalScore = totalScore - 10;
                    }
                    if(totalScore <= 21) return totalScore;
                }
            }
            return totalScore;
        };
        this.printHand = function(){
            str = "";
            for(i=0;i<Cards.length;i++){
                if(i>0)str += ", ";
                switch(Cards[i].getNumber()){
                case 1: 
                    str += "Ace";
                    break;
                case 13:
                    str += "King";
                    break;
                case 12:
                    str += "Queen";
                    break;
                case 11:
                    str += "Jack";
                    break;
                default:
                    str += Cards[i].getNumber();
                }
                
                str += " of "+Cards[i].getSuit();
            }
            return str;
        };
        this.hitMe = function(){
            Cards[Cards.length] = deal();
        };
    }
}

/*playAsDealer()
*param: none
*return: -Hand::a Hand object represents dealer's hand
*/
var playAsDealer = function(currentHand){
 //   var hand = new Hand();
    hand = currentHand;
    while(letsPlay && deck.length > 0 && hand.score() < 17){
        hand.hitMe();
    }
    return hand;
};

/*playAsUser()
*/
var playAsUser = function(currentHand){
//    var hand = new Hand();
    hand = currentHand;
    if(letsPlay && hand.score()===21)confirm("You got Black Jack!");
    while(letsPlay && hand.score()<21 && deck.length > 0 && confirm(hand.printHand()+" Do you want a hit?")){
        hand.hitMe();
        if(!letsPlay) break;
        if(hand.score() > 21) break;
        if(hand.score()===21) break;
    }
    return hand;
};
/* declareWinner
*/
var declareWinner = function(userHand,dealerHand){
    if(userHand.score() > 21){
        if(dealerHand.score() > 21){
            return "You tied!";
        }else{
            return "You lose!";
        }
    }else if (dealerHand.score() > 21){
        return "You win!";
    }
    if(userHand.score() > dealerHand.score()){
        return "You win!";
    }else if(userHand.score() < dealerHand.score()){
        return "You lose!";
    }else{
        return "You tied!";
    }
};
var playGame = function(){
    newDeck();
    letsPlay = true;
    while(letsPlay){
        if(deck.length > 0){
        console.log("");
        userHand = new Hand();
        if(userHand.getHand() !== undefined){
            if(userHand.score() <= 21){
                dealerHand = new Hand();
            }
        }
        if(userHand.getHand() !== undefined && dealerHand.getHand() !== undefined){
            if(userHand.score() <= 21){
                userHand = playAsUser(userHand);
            }
        }
        if(!letsPlay){
            console.log("Ran out of cards. Game over!");
            break;
        }
        if(userHand.getHand() !== undefined){
            if(userHand.score() <= 21){
            dealerHand = playAsDealer(dealerHand);
            }
        }
        if(!letsPlay){
            console.log("Ran out of cards. Game over!");
            break;
        }
 //       if(deck.length > 0){
            winner = declareWinner(userHand,dealerHand);
            if(userHand.score() <=21){
                str = "Dealer: "+dealerHand.printHand();
                if(dealerHand.score()===21){
                    str += "; BLACK JACK!";
                }else if(dealerHand.score()>21){
                    str += "; Dealer busted!";
                }else{
                    str += " for a score of "+dealerHand.score();
                }
                console.log(str);
            }
                str = "You: "+userHand.printHand();
                if(userHand.score()===21){
                    str += "; BLACK JACK!";
                }else if(userHand.score()>21){
                    str += "; You busted!";
                }else{
                    str += " for a score of "+userHand.score();
                }
                console.log(str);
                if(userHand.score()<=21)console.log(winner);
        }else{
            console.log("Ran out of cards. Game over!");
        }
    }
};
playGame();