import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { PlayerListComponent } from '../components/player-list/player-list.component';

const routs: Routes = [
  {path: 'add_player', component: AddPlayerComponent},
  {path: 'players', component: PlayerListComponent},
  {path: '', redirectTo: '/add_player', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
