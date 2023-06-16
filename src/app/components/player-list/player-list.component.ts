import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit{
  players: Player[] = []

  constructor(private playerService: PlayerService){
    
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    console.log(this.players);
  }
}
