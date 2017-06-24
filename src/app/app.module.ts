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
