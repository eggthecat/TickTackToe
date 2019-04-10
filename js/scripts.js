//Backend Logic
function Game() {
  this.board = new Board();
  this.players = [];
  this.oTurn = false;
}

function Board() {
  this.spaces = [9];
}


Board.prototype.markSquare = function (squareId, oTurn) {
  if (oTurn) {
    this.spaces[squareId] = "O"
  } else {
    this.spaces[squareId] = "X"
  }
};

function Player(name) {
  this.name = name;
}






//UI Logic

function addEventHandlers() {
   $("#board").on("click", "tr", function() {
     var itemId = this.id
     //updateInventoryTable(carInventory, '#car-inventory');
   });
 }



 function createBoard(data, table) {
     var items = ""

     // items += "<tr>" + "<th id=" +
     // <tr>
     //   <th>O</th><th>X</th><th>O</th>
     // </tr>
     // <tr>
     //   <th>O</th><th>X</th><th>O</th>
     // </tr>
     // <tr>
     //   <th>O</th><th>X</th><th>O</th>
     // </tr>
     // for (var i = 0; i < stuff.inventory.length; i++) {
     // }
     // $(table).empty();
     // $(table).html(items);
   }

var myGame;

$(function () {
  myGame = new Game();
  myGame.players.push("Player 1")
  myGame.players.push("Player 2")



})









   // if (stuff.inventory[i]) {
     //   var inv = stuff.inventory[i]
     //   items += "<tr id='item-" + inv.name + "'><th>" + inv.name +
     //   "</th><th>" + inv.cost +
     //   "</th><th>" + inv.weight +
     //   "</th><th>" + inv.quantity + "</th>"
     // }
