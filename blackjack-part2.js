  // Make your card constructor again here, but make sure to use private
// variables!
var Card = function(s, n){
    var suit = s;
    var number = n;
    this.getSuit = function(){
        return suit;
    };
    this.getNumber = function(){
        return number;
    };
    this.getValue = function(){
        if(number >=10){
            return 10;
        } else if(number === 1){
            return 11;
        } else {
            return number;
        }
    };
};

// Make a deal function here.  It should return a new card with a suit
// that is a random number from 1 to 4, and a number that is a random
// number between 1 and 13
function deal(){
    var suit = Math.floor(Math.random() * 4 + 1);
    var number = Math.floor(Math.random() * 13 + 1);
    return new Card(suit, number);
}

// examples of the deal function in action
var card1 = deal();
var card2 = deal();

console.log(card1.getSuit());
console.log(card1.getNumber());
console.log(card1.getValue());

var Hand = function(){
    this.card1 = deal();
    this.card2 = deal();
    this.score = function(){
        return card1.getValue() + card2.getValue();
    };
};

var myHand = new Hand(); 
var yourHand = new Hand();

console.log("I scored a "+myHand.score()+" and you scored a "+ yourHand.score());

if(yourHand.score() > myHand.score()) console.log("you win!"); else if(yourHand.score() < myHand.score()) console.log("I win!"); else console.log("We tied!")


