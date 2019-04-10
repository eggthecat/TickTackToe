//Backend Logic

// This is a constructor to create the Game
function Game() {
  this.board = new Board();
  this.players = [];
  this.oTurn = false
  this.currentPlayer = 0;
}

// This prototype changes the players turn
Game.prototype.getNextPlayer = function () {
  this.currentPlayer++;
  if (this.currentPlayer > 1) {
      // This basically says take the players array position (0 or 1) add 1, then check if the new total is more than 1 (this.players.length = 2, then it subtracts 1). If it is not higher than 1 it returns the the player position.  If it is higher than 1 it is reset to 0, then returns that position.  Making it an insane way of turning 1's to 0's and 0's to 1's.
  // if (this.currentPlayer > this.players.length - 1) {
    this.currentPlayer = 0;
  }
  return this.players[this.currentPlayer];
};

// This is the Board constructor that creates an empty array and a place for the winner.
function Board() {
  this.spaces = [],
  this.gameWinner = ""
}


Board.prototype.getSpaceValue = function (squareId) {
  // $('#reset-game').hide();
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

function Player(name, color) {
  if (!color){
    color = randomcolorS();
  }
  this.name = name;
  this.color = color;
}

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
//  This part checks is a clicked box already has a value, and if there is no winner yet.
    if (game.board.getSpaceValue(parseInt(itemId)) === "&nbsp;" &&
    game.board.gameWinner === "") {
      game.board.markSquare(itemId, game.oTurn);

// This part checks the board for winners after every click
      if (game.board.checkWin()) {
//  If it's O's turn and there is a winner this is displayed
        if (game.oTurn) {
          game.board.gameWinner = "O"
          $('#gameWinner').text("O Wins!")
          $('#gameWinner').show("fade", 1000)
        } else {
// If it's not O's turn and there is a winner X wins is displayed
          game.board.gameWinner = "X"
          $('#gameWinner').text("X Wins!")
          $('#gameWinner').show("fade", 1000)
        }
      }
// If there is no winner it runs the changePlayer funciton
      changePlayer(game, outputTable);
    }
  });
}

// This function runs when clicking Play Again, it fixes the error where previous games X's and O's stayed on the board after starting new game.
function removeEvent() {
  $("#board").off("click", "th");
}

// This function recreates the board every turn with X's and O's in place
function updateBoard(board, outputTable) {
  var items = ""
  for (var i = 0; i < 9; i++) {
// these are the Space Id's where to begin new lines on the grid.
    if (i === 0 || i === 3 || i === 6) {
      items += "<tr>"
    }
    items += "<th id='" + i + "'>" + board.getSpaceValue(i) + "</th>"
// this part ends a row when it gets to space value 2, 5, 8
    if (i === 2 || i === 5 || i === 8) {
      items += "</tr>"
    }
  }
// This is the function to empty the board and immediately recreate it.
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
    $('#players').text("Player 1");
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
