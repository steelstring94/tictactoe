import { Component, OnInit } from '@angular/core';

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
	
	onClick(row, cell): void {
		if(!this.victory) {
			if(this.isVictory(row, cell)) {
				return;
			}
		}
		
		else {
			return;
		}
		
		if((this.board[row][cell] !== 0)) {
			return;
		}
		
		this.board[row][cell] = this.turn;
		
		if(this.turn === 1) {
			this.turn = 2;
		}
		
		else {
			this.turn = 1;
		}
	}
	
	isVictory(row, cell): void {
	
		let boardCopy = this.board.map(arr => arr.slice());
		boardCopy[row][cell] = this.turn;
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
		function containsZero(nums) {
			let ret = false;
			
			nums.forEach((num) => { 
				if(num === 0) {
					ret = true;
				}
			});
			return ret;
		}
		
		for(let i = 0; i < flat.length; i++) {
			if((flat[i][0] === flat[i][1]) && (flat[i][1] === flat[i][2]) && !(containsZero(flat[i]))) {
				return true;
			}
		}
		
		return false;
	}
	
	reset(): void {
		this.board.forEach((row, i) => {
			row.forEach((cell, k) => {
				this.board[i][k] = 0;
			});
		});
		this.victory = false;
		this.victor = '';
		this.turn = 1;
	}
}
