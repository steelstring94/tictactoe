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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TicTacToeService } from './tictactoe.service';
import { AppComponent } from './app.component';
import { State } from './state';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [TicTacToeService, State],
  bootstrap: [AppComponent]
})
export class AppModule { }
