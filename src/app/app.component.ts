import { Component } from '@angular/core';
import { TicTacToeService } from './tictactoe.service';

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
	draw: boolean = false;
	
	constructor(private tttservice: TicTacToeService) {}
	
	//This method executed whenever a
	//cell on the board is clicked.
	onClick(row, cell): void {
		
		let newState = this.tttservice.handleClick({
			board: this.board,
			turn: this.turn,
			victory: this.victory,
			victor: this.victor,
			draw: this.draw
		}, row, cell);
		
		this.board = newState.board;
		this.turn = newState.turn;
		this.victory = newState.victory;
		this.victor = newState.victor;
		this.draw = newState.draw;
	}
	
	//This method is triggered by the
	//reset button and resets the board.
	reset(): void {
		//Iterate through all rows and
		//cells and set them to 0.
		this.board.forEach((row, i) => {
			row.forEach((cell, k) => {
				this.board[i][k] = 0;
			});
		});
		
		//Reset victory, victor name and draw
		//and reset turn to player 1.
		this.victory = false;
		this.draw = false;
		this.victor = '';
		this.turn = 1;
	}
}
