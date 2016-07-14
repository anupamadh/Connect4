# Connect4
Introduction
============
Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent.

I have extended the game by adding a degree of unpredictability by swapping 2 columns randomly at the 11th move. The players have to rethink their strategy after the columns are swapped.

The game employs *Object Oriented Programming*.

Description
===========
_Layout:_

DROP PANEL
=======================
GAME BOARD
=======================
NEW GAME PANEL(Restart)
=======================

1. A playboard with 6 rows and 7 columns is created and initialized.
A drop panel is created on top where the chips are located. The player can click on the chip and it will drop down the column to the lowest empty slot.
2. The event handler listens for clicks on the drop panel chips.
3. Once a player clicks on the chip, the color of the drop panel chips changes to indicate the next color chip that can be played. Once an entire column is filled with chips the chips on the drop panel are disabled and the user can no longer click on them.
4. Every time a player clicks on a chip, a function is called to calculate the placement of the chip on board. This is stored in the playboard array.
5. After this a function is called to calculate the grid no based the row and colums. For eg. the top left slot will be numbered 1 and the bottom right will be numbered 42. This number is used to place the correct disc in the correct slot on the playboard.
6. After the 10th move, the chips in 2 randomly selected columns will be swapped.
7. After every move a function is called to check if there is a winning condition. If a winning condition is satisfied, the drop panel display changes to indicate which color has won.
8. The game ends if either player wins or if 42 moves have been made. If neither player wins the game ends in a tie.
10. Either player can click on the restart button to start the game from the beginning.

The game can be played at:https://anupamadh.github.io/Connect4/

References:https://github.com/ning-github/connect4jqueryGame
