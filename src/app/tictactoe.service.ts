//Copyright 2017 github.com/steelstring94

/* This file is part of Tic-Tac-Toe by steelstring94.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable()
export class TicTacToeService {

	constructor(private newState: State) {}

	handleClick(state, row, cell): State {
		this.newState = JSON.parse(JSON.stringify(state));

		//Return (i.e. do nothing with the click,
		//and do not increment the current turn)
		//if the cell clicked was not empty.
		if((this.newState.board[row][cell] !== 0)) {
			return this.newState;
		}

		//If the victory flag is set, that
		//means the game is over, and the
		//else statement will return, preventing
		//additional moves.
		if(!this.newState.victory) {
			//Check if the move that was just made
			//constitutes a victory.
			this.isVictory(row, cell);
		}

		else {
			return this.newState;
		}

		//Check for a draw
		if(this.isDraw(row, cell)) {
			this.newState.board[row][cell] = this.newState.turn;
			this.newState.draw = true;
			return this.newState;
		}



		//Change the number at the current cell
		//to equal the player whose turn it is.
		//This works because 1 represents an X,
		//which is player 1, and 2 represents an
		//O - player 2.
		this.newState.board[row][cell] = this.newState.turn;

		//Set the current turn to the opposite
		//of whatever it was to begin with.
		//In other words, make it the other
		//player's turn.
		this.newState.turn = this.newState.turn === 1 ? 2 : 1;

		return this.newState;
	}

	isDraw(row, cell): boolean {
		//If victory has already been achieved,
		//then there cannot be a draw.  Without
		//this check, a victory where the final
		//move takes the last open cell on the
		//board will register as a draw.
		if(this.newState.victory) {
			return false;
		}
		//Start from the assumption that it is
		//a draw, set to false if we find at least
		//one cell equal to zero.
		let draw = true;
		//Create copy of board so we can check
		//the latest move without modifying
		//the actual board.
		let boardCopy = this.newState.board.map(arr => arr.slice());
		boardCopy[row][cell] = this.newState.turn;
		boardCopy.forEach((row) => {
			row.forEach((cell) => {
				//If any cell is equal to zero, then
				//there is no draw.
				if(cell === 0) {
					draw = false;
				}
			});
		});
		return draw;
	}

	isVictory(row, cell): void {

		//Make a copy of the current board so that
		//we can add in the move we are checking out
		//and examine it without affecting the genuine
		//copy.
		let boardCopy = this.newState.board.map(arr => arr.slice());
		boardCopy[row][cell] = this.newState.turn;

		//Set the victor based on whose turn it is.
		//This will not be used if there is no victor.
		this.newState.victor = this.newState.turn === 1 ? 'X' : 'O';

		//Flattening the board into one dimension,
		//three different ways to simplify checking.
		let flat: number[][] = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];

		//Flatten for rows
		boardCopy.forEach((row, i) => {
			row.forEach((cell, k) => {
				flat[i][k] = cell;
			});
		});

		//Check the flattened version of
		//the board for victory.
		if(this.flatCheck(flat)) {
			this.newState.victory = true;
		}

		//Flatten for columns
		boardCopy.forEach((row, i) => {
			row.forEach((cell, k) => {
				flat[k][i] = cell;
			});
		});

		if(this.flatCheck(flat)) {
			this.newState.victory = true;
		}

		//Flatten for the diagonal
		//Top left to bottom right
		for(let i = 0; i <= 2; i++) {
			flat[0][i] = boardCopy[i][i];
		}

		//Flatten for the diagonal
		//Bottom left to top right
		for(let i = 2; i >= 0; i--) {
			//Progression is [2][0], [1][1], [0][2]
			//When i === 2, the second number - we'll
			//call it k - must be 0, or i - 2.  When
			//i === 1, k must === 1, or abs(i-2).
			//When i === 2, k must === 0, or abs(i-2).
			//This is why absolute value was used here.
			flat[1][i] = boardCopy[i][Math.abs(i-2)];
		}

		if(this.flatCheck(flat)) {
			this.newState.victory = true;
		}
	}

	//Takes an array of flattened board
	//values and checks for a win.
	flatCheck(flat): boolean {
		let ret = false;
		//Check if one dataset contains any
		//zeroes.  If it does, then it cannot
		//be a winner.
		function containsZero(nums) {
			let ret = false;

			nums.forEach((num) => {
				if(num === 0) {
					ret = true;
				}
			});
			return ret;
		}

		flat.forEach((row) => {
			//Checking if all three values in the row are equal
			//and that no zeroes are present in a row.
			if((row[0] === row[1]) && (row[1] === row[2]) && !(containsZero(row))) {
				ret = true;
			}
		});
		return ret;
	}
}
