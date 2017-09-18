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

import { Component } from '@angular/core';
import { TicTacToeService } from './tictactoe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic-Tac-Toe';
  board: number[][];
	turn: number = 1;
	victory: boolean = false;
	victor: string = '';
	draw: boolean = false;

	constructor(private tttservice: TicTacToeService) {
		this.board = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];
	}

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
