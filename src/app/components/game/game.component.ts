import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameTypes } from 'src/app/models/game-types';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  players: Player[] = [];
  prevPoints: number[][] = [];
  test = [1, 1];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private gameService: GameService,
    private router: Router){
    
  }

  ngOnInit(): void {
    this.gameService.initGame(GameTypes.Game501);
    this.players = this.gameService.getPlayers();
  }

  addPoints(): void{
    console.log(this.test);
  }

  startNewGame(): void{
    this.router.navigate(["players"]);
  }
}
