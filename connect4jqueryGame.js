/* BLUEPRINT
	1. The game board is called Connect4
	general process:
		1. Click on the top row => input to game board
		2. Game board processes input into an output disc within
			its own board by changing the color of the grid box
    3. Each time a disc is dropped, the winning condition is checked.
    4. After the 10th move, 2 columns will be randomly swapped.

*/

//put everything inside document ready.All objects & methods.
$(document).ready(function() {
  var game = {
    rowNum: 6, //6 rows
    colNum: 7, //7 columns
    totalMovesLeft: this.rowNum * this.colNum, //tracks whose turn, as well as game end
    win: false, // indicates whether there's been a winner or not

    //when a column is clicked
    selected: 0,
    result: 0,
    moveCoord: 0,
    playboard: [],

    //setup playboard
    //makes 7 columns for every row
    resetPlayboard: function() {
      //     //fills playboard with blank underscores
      for (var row = 0; row < this.rowNum; row++) {
        for (var col = 0; col < this.colNum; col++) {
          this.playboard[row][col] = "_";
        }
      }
    }, // end resetPlayboard function

    //locate the lowest row within the selected column that the disc can be paced in
    //fill it with the disc and return the x,y coordinates of the placement. Does not actually change the color of that div.

    play: function(color, colChosen) {
      var placement = null;
      var placementCol = 0;
      var placementRow = 0;

      for (var row = 0; row < this.rowNum; row++) {

        if ((this.playboard[row][colChosen - 1] === "_")) {
          placement = [row + 1, colChosen];
        }
      }
      this.totalMovesLeft--;
      this.playboard[placement[0] - 1][placement[1] - 1] = color;
      return placement;
    }, //end play function

    // find the actual grid no. on the playboard and return it as the result
    /*[1,  2,   3,  4,  5,  6,  7]
      [8,  9,  10, 11, 12, 13, 14]
      [15, 16, 17, 18, 19, 20, 21]
      [22, 23, 24, 25, 26, 27, 28]
      [29, 30, 31, 32, 33, 34, 35]
      [36, 37, 38, 39, 40, 41, 42]
    */
    putOnDisplayboard: function(coord) {

      var xLoc = coord[0];
      var yLoc = coord[1];

      //   //x is the nth-child of .dropPanel
      //   //y is the nth-child of .gameboard
      //
      //   //example of 12 spot
      //   // x=2;
      //   // y=5;
      //   // (x*colNum)-(colNum-y);
      //   // (2*7)-(7-5)=33;
      var locOnBoard = ((xLoc * this.colNum) - (this.colNum - yLoc));
      console.log("locOnBoard" + locOnBoard);
      return locOnBoard;
    }, //end putOnDisplayboard function


    //check for winning conditions-Four in a row.
    //Can be vertically, horizontally or diagonally
    checkWin: function(color) {
      // var checkWin = function(color) {
      var winDesig;
      if (color === "red") {
        winDesig = "R"; //"R" and "B" differences help when  in the console
      }
      if (color === "blue") {
        winDesig = "B";
      }
      //check horizontal
      for (var row = 0; row < this.rowNum; row++) {
        for (var col = 0; col < this.colNum - 3; col++) { // -3 because the 4th column is bound for hor. connect4 going right
          if (this.playboard[row][col] === color) {
            if (this.playboard[row][col + 1] === color && this.playboard[row][col + 2] === color && this.playboard[row][col + 3] === color) {

              this.playboard[row][col] = winDesig;
              this.playboard[row][col + 1] = winDesig;
              this.playboard[row][col + 2] = winDesig;
              this.playboard[row][col + 3] = winDesig;
              this.win = true;
            }
          }
        }
      } //end check horizontal

      //check vertical
      for (var row = 0; row < this.rowNum - 3; row++) { // -3 because 4th row is the bound for vert connect4 going down
        for (var col = 0; col < this.colNum; col++) {
          if (this.playboard[row][col] === color) {
            if (this.playboard[row + 1][col] === color && this.playboard[row + 2][col] === color && this.playboard[row + 3][col] === color) {

              this.playboard[row][col] = winDesig;
              this.playboard[row + 1][col] = winDesig;
              this.playboard[row + 2][col] = winDesig;
              this.playboard[row + 3][col] = winDesig;
              this.win = true;
            }
          }
        }
      } //end check vertical

      //check SouthWest to NorthEast	(diagonal)
      for (var row = 3; row < this.rowNum; row++) { //for such a diagonal to be possible, need to at least rows above
        for (var col = 0; col < this.colNum - 3; col++) {
          if (this.playboard[row][col] === color) {
            if (this.playboard[row - 1][col + 1] === color && this.playboard[row - 2][col + 2] === color && this.playboard[row - 3][col + 3] === color) {

              this.playboard[row][col] = winDesig;
              this.playboard[row - 1][col + 1] = winDesig;
              this.playboard[row - 2][col + 2] = winDesig;
              this.playboard[row - 3][col + 3] = winDesig;
              this.win = true;
            }
          }
        }
      } //end check SouthWest to NorthEast

      //check NorthWest to SouthEast (diagonal)
      for (var row = 0; row < this.rowNum - 3; row++) { // -3 due to separation boundary of possible spots on board
        for (var col = 0; col < this.colNum - 3; col++) {
          if (this.playboard[row][col] === color) {
            if (this.playboard[row + 1][col + 1] === color && this.playboard[row + 2][col + 2] === color && this.playboard[row + 3][col + 3] === color) {

              this.playboard[row][col] = winDesig;
              this.playboard[row + 1][col + 1] = winDesig;
              this.playboard[row + 2][col + 2] = winDesig;
              this.playboard[row + 3][col + 3] = winDesig;
              this.win = true;
            }
          }
        }
      } //end check NorthWest to SouthEast
    }, //end checkWin function

    //  swaps the content of 2 columns
    swapColumns: function(col1, col2) {
      var colDiff;
      var temp;
      colDiff = Math.abs(col1 - col2);
      if (col1 > col2) {
        temp = col1;
        col1 = col2;
        col2 = temp;
      }
      //this loop swaps the colors
      console.log("col1:" + col1);
      console.log("col2:" + col2);
      for (var id = col1; id < (col1 + 37); id += 7) {
        var tempColorCol1;
        var tempColorCol2;

        tempColorCol1 = $("#square" + (id + 1)).css(
          "background-color"
        );

        tempColorCol2 = $("#square" + (id + 1 + colDiff)).css(
          "background-color"
        );
        $("#square" + (id + 1)).css(
          "background-color", tempColorCol2
        );
        $("#square" + (id + 1 + colDiff)).css(
          "background-color", tempColorCol1
        );

      }
      //this loop swaps the values "red" & "blue" between the 2 columns
      for (var row = 0; row < this.rowNum; row++) {
        var tempResult1;
        var tempResult7;
        tempResult1 = this.playboard[row][col1];
        this.playboard[row][col1] = this.playboard[row][col2];
        this.playboard[row][col2] = tempResult1;
      }
    },

    // listens for click events on the dropPanel.
    // Calls the functions to populate the playboard and display the correct // // color of the disc. Also calls the function to check if the player has won //the game
    listen: function() {
      $(".dropPanel div").click(function(event) {

        //controls color/turn alternation
        var checkerColor;
        var otherColor;
        var swapArray = [0, 1, 2, 3, 4, 5, 6]

        if (this.totalMovesLeft % 2 === 0) {
          checkerColor = "red";
          otherColor = "blue";
        } else {
          checkerColor = "blue";
          otherColor = "red";
        };

        //randomize the columns to be used for swapping
        swapArray.sort(function() {
          return 0.5 - Math.random()
        });

        //swap 2 columns if 10 moves are over
        if (this.totalMovesLeft === 32) {
          console.log("Columns to be swapped are: " + swapArray[0], swapArray[1]);
          this.swapColumns(swapArray[0], swapArray[1]);

          // this.swapColumns();
        }
        //change column panel color
        $(".dropPanel div").css({
          "background-color": otherColor
        });

        //event.target gets the DOM element that initiated the event.
        //.index() finds the position of the element relative to it's siblings.
        selected = ($(event.target).index()) + 1;

        this.moveCoord = (this.play(checkerColor, selected));
        this.result = this.putOnDisplayboard(this.moveCoord);

        $(".gameboard div:nth-child(" + this.result + ")").css({
          "background-color": checkerColor
        });

        for (var full = 1; full <= 7; full++) {
          if (this.result === full) { //if column is now full
            $(event.target).off();
          }
        } //end full column check

        if (checkerColor === "red") {
          this.checkWin("red");
        } else {
          this.checkWin("blue");
        }

        //if there was a win
        if (this.win) {

          if (checkerColor === "red") {
            $(".dropPanel").addClass("redWins");
            $(".dropPanel").html('RED WINS!');
          } else {
            $(".dropPanel").addClass("blueWins");
            $(".dropPanel").html('BLUE WINS!');
          }
        } //end if win

        //if there was no win, but no more moves left to make
        else if (this.totalMovesLeft === 0) {
          $(".dropPanel").addClass("tieGame");
          $(".dropPanel").html('TIE GAME!');
        };
      }.bind(this)); //end click event
    }, //end listen function

    restart: function() {
      //Reload page from server not from cache
      location.reload(true);
    },

    //resets the gameboard and handles the restart game event
    newGame: function() {
        this.resetPlayboard();

        this.totalMovesLeft = this.colNum * this.rowNum;
        this.win = false;

        $(".newGamePanel").click(function() {
          this.restart();
        }.bind(this));
      } //end newGame function

  };

  //Creates the 2-D playboard array
  var Init = {
    init: function() {
      for (var row = 0; row < game.rowNum; row++) {
        var inners = new Array(game.colNum); //makes columns
        game.playboard.push(inners);

      }
    }

  };
  Init.init();
  game.newGame();
  game.listen();
}); //end document.ready
