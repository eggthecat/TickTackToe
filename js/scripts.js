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
  }
  return "-"
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

function addEventHandlers(game, outputTable) {
  $("#board").on("click", "th", function() {
    var itemId = this.id

    if (game.board.getSpaceValue(parseInt(itemId)) === "-") {

    game.board.markSquare(itemId, game.oTurn);
    if (game.oTurn)  {
      $('body').clearQueue()
      $('body').animate({"background-color" : "#FFEBCD"}, 2000);
    } else {
      $('body').clearQueue()
      $('body').animate({"background-color" : "#a1b2ce"}, 2000);
    }
    game.oTurn = !game.oTurn
    updateBoard(game.board, outputTable)
    //updateInventoryTable(carInventory, '#car-inventory');
  }
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
    $(outputTable).empty();
    $(outputTable).html(items);
}

  var myGame;

  $(function () {
    myGame = new Game();
    myGame.players.push("Player 1")
    myGame.players.push("Player 2")
    updateBoard(myGame.board, "#board")
    addEventHandlers(myGame, "#board");
  })

  // if (stuff.inventory[i]) {
    //   var inv = stuff.inventory[i]
    //   items += "<tr id='item-" + inv.name + "'><th>" + inv.name +
    //   "</th><th>" + inv.cost +
    //   "</th><th>" + inv.weight +
    //   "</th><th>" + inv.quantity + "</th>"

    // }
