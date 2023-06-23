import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { PlayerListComponent } from '../components/player-list/player-list.component';
import { GameComponent } from '../components/game/game.component';
import { gameGuard } from '../services/game.guard';
import { NotFoundErrorComponent } from '../components/not-found-error/not-found-error.component';

const routs: Routes = [
  {path: 'add_player', component: AddPlayerComponent},
  {path: 'players', component: PlayerListComponent},
  {path: 'game/:gameType', component: GameComponent, canActivate: [gameGuard]},
  {path: '', redirectTo: '/players', pathMatch: 'full'},
  {path: '**', component: NotFoundErrorComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
