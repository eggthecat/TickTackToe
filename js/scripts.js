//Backend Logic
function Game() {
  this.board = new Board();
  this.players = [];
  this.oTurn = false;
}

function Board() {
  this.spaces = [];
}

Board.prototype.getSpaceValue = function (squareId) {
  if (this.spaces[squareId]) {
    return this.spaces[squareId]
  } else {
    return "#"
  }
};


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

function updateBoard(board, outputTable) {
  var items = ""
  for (var i = 0; i < 9; i++) {
    if (i === 0 || i === 3 || i === 6) {
      items += "<tr>"
    }
    items += "<th id='" + i + "'>" + board.getSpaceValue(i) + "</th>"
    if (i === 2 || i === 5 || i === 8) {
      items += "</tr>"
    }
  }
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
    $(outputTable).empty();
    $(outputTable).html(items);
    console.log(items);
  }

  var myGame;

  $(function () {
    myGame = new Game();
    myGame.players.push("Player 1")
    myGame.players.push("Player 2")
    updateBoard(myGame.board, "#board")
  })

  // if (stuff.inventory[i]) {
    //   var inv = stuff.inventory[i]
    //   items += "<tr id='item-" + inv.name + "'><th>" + inv.name +
    //   "</th><th>" + inv.cost +
    //   "</th><th>" + inv.weight +
    //   "</th><th>" + inv.quantity + "</th>"

    // }
