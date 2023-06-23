import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { GameComponent } from './components/game/game.component';
import { WinnerPipe } from './services/winner.pipe';
import { WinnerPopupComponent } from './components/winner-popup/winner-popup.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ForDirective } from './services/for.directive';
import { ForReverseDirective } from './services/for-reverse.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    PlayerListComponent,
    GameComponent,
    WinnerPipe,
    WinnerPopupComponent,
    CopyrightComponent,
    ForDirective,
    ForReverseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
