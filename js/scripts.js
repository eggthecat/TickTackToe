//Backend Logic
function Game() {
  this.board = new Board();
  this.players = [];
  this.oTurn = false
  this.currentPlayer = 0;
}

Game.prototype.getNextPlayer = function () {
  this.currentPlayer++;
  if (this.currentPlayer > this.players.length - 1) {
    this.currentPlayer = 0;
  }
  return this.players[this.currentPlayer];
};

function Board() {
  this.spaces = [],
  this.gameWinner = ""
}

Board.prototype.getSpaceValue = function (squareId) {
  if (this.spaces[squareId]) {
    return this.spaces[squareId]
  }
  return "&nbsp;"
};


Board.prototype.markSquare = function (squareId, oTurn) {
  if (oTurn) {
    this.spaces[squareId] = "O"
  } else {
    this.spaces[squareId] = "X"
  }
};

function Player(name, color) {
  if (!color){
    color = randomcolorS();
  }
  this.name = name;
  this.color = color;
}

Board.prototype.checkWin = function () {

  var s = this.spaces;
  if ((s[0] && (s[0] === s[1] && s[1] === s[2])) ||
      (s[3] && (s[3] === s[4] && s[4] === s[5])) ||
      (s[6] && (s[6] === s[7] && s[7] === s[8])) ||
      (s[0] && (s[0] === s[3] && s[3] === s[6])) ||
      (s[1] && (s[1] === s[4] && s[4] === s[7])) ||
      (s[2] && (s[2] === s[5] && s[5] === s[8])) ||
      (s[0] && (s[0] === s[4] && s[4] === s[8])) ||
      (s[2] && (s[2] === s[4] && s[4] === s[6]))) {
    return true;
  }
};

function changePlayer(game, outputTable) {
  var player = game.getNextPlayer();

  game.oTurn = !game.oTurn;
  $('body').clearQueue()
  console.log(player);
  $('body').animate({"background-color" : player.color}, 200);
  //$('#players').animate({"color" : player.color}, 500);
  $('#players').text(player.name);

  updateBoard(game.board, outputTable);
}



//UI Logic
function addEventHandlers(game, outputTable) {
  $("#board").on("click", "th", function() {
    var itemId = this.id

    if (game.board.getSpaceValue(parseInt(itemId)) === "&nbsp;" &&
        game.board.gameWinner === "") {
      console.log("works");
      game.board.markSquare(itemId, game.oTurn);

      if (game.board.checkWin()) {
        if (game.oTurn) {
          game.board.gameWinner = "O"
          $('#gameWinner').text("O Wins!")
          $('#gameWinner').show("fade", 1000)
        } else {
          game.board.gameWinner = "X"
          $('#gameWinner').text("X Wins!")
          $('#gameWinner').show("fade", 1000)
        }
      }
      changePlayer(game, outputTable);
    }
  });
}

function removeEvent() {
  $("#board").off("click", "th");
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

var myGame = new Game();

$(document).ready(function () {
  myGame.players.push(new Player("Player 1"))
  myGame.players.push(new Player("Player 2"))
  updateBoard(myGame.board, "#board")
  addEventHandlers(myGame, "#board");

  $("#reset-game").click(function(){
    myGame = new Game();
    myGame.players.push(new Player("Player 1"))
    myGame.players.push(new Player("Player 2"))
    $('#gameWinner').hide("fade", 1000)
    removeEvent();
    addEventHandlers(myGame, "#board");
    updateBoard(myGame.board, "#board")
  });


})

var randomcolor = function() {
  var r = Math.round( Math.random() * 255);
  var g = Math.round( Math.random() * 255);
  var b = Math.round( Math.random() * 255);
  var color = "rgb(" + r + ", " + g + ", " + b + ")"
  return color;
}

var randomcolorS = function() {
  var h = Math.round( Math.random() * 360);

  var color = "hsl(" + h + ", 50%, 80%)"
  //hsl(360, 100%, 100%);
  console.log(color);
  return color;
}
