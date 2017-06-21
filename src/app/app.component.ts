import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tictactoe';
  board: number[][] = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	];
	
	onClick(cell): void {
		cell = 1;
	}
}
