import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameTypes } from 'src/app/models/game-types';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit{
  players: Player[] = [];
  gameType?: GameTypes;
  allGameTypes = GameTypes;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private gameService: GameService){
    
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  removePlayer(id: number): void{
    this.playerService.removePlayer(id);
  }

  selectPlayer(id: number): void{
    this.playerService.selectPlayer(id);
  }

  addPlayer(): void{
    this.router.navigate(["add_player"]);
  }

  search(term: string): void{
    this.players = this.playerService.searchPlayers(term);
  }

  chooseGame(game: number): void{
    switch(game){
      case 301:
        this.gameType = GameTypes.Game301;
        break;
      case 501:
        this.gameType = GameTypes.Game501
        break;
      default:
        this.gameType = undefined;
    }
  }

  start(): void{
    if (this.gameType){
      this.gameService.initGame(this.gameType);
      this.router.navigate(["game"]);
    }
  }
}
