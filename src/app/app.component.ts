import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic-Tac-Toe';
  board: number[][] = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	];
	
	turn: number = 1;
	victory: boolean = false;
	victor: string = '';
	
	//This method executed whenever a
	//cell on the board is clicked.
	onClick(row, cell): void {
		//If the victory flag is set, that
		//means the game is over, and the
		//else statement will return, preventing
		//additional moves.
		if(!this.victory) {
			//If the flag is not set, we will
			//check to see if the move that has
			//just been made constitutes a victory
			//and, if so, we will immediately return.
			if(this.isVictory(row, cell)) {
				return;
			}
		}
		
		else {
			return;
		}
		
		//Return (i.e. do nothing with the click,
		//and do not increment the current turn)
		//if the cell clicked was not empty.
		if((this.board[row][cell] !== 0)) {
			return;
		}
		
		//Change the number at the current cell
		//to equal the player whose turn it is.
		//This works because 1 represents an X,
		//which is player 1, and 2 represents an
		//O - player 2.
		this.board[row][cell] = this.turn;
		
		//Set the current turn to the opposite
		//of whatever it was to begin with.
		//In other words, make it the other
		//player's turn.
		this.turn = this.turn === 1 ? 2 : 1;
	}
	
	isVictory(row, cell): void {
	
		//Make a copy of the current board so that
		//we can add in the move we are checking out
		//and examine it without affecting the genuine
		//copy.
		let boardCopy = this.board.map(arr => arr.slice());
		boardCopy[row][cell] = this.turn;
		
		//Set the victor based on whose turn it is.
		//This will not be used if there is no victor.
		this.victor = this.turn === 1 ? 'X' : 'O';
	
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
			this.victory = true;
		}
		
		//Flatten for columns
		boardCopy.forEach((row, i) => {
			row.forEach((cell, k) => {
				flat[k][i] = cell;
			});
		});
		
		if(this.flatCheck(flat)) {
			this.victory = true;
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
			this.victory = true;
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
	
	//This method is triggered by the
	//reset button and resets the board.
	reset(): void {
		//Iterate through all rows and
		//cells and set them to 0.
		this.board.forEach((row, i) => {
			row.forEach((undefined, k) => {
				this.board[i][k] = 0;
			});
		});
		
		//Reset victory, victor name
		//and reset turn to player 1.
		this.victory = false;
		this.victor = '';
		this.turn = 1;
	}
}
