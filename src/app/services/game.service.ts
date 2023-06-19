import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { GameTypes } from '../models/game-types';
import { Game501 } from '../models/game501';
import { Player } from '../models/player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game?: Game;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private playerService: PlayerService) 
  {

  }

  initGame(gameType: GameTypes): void{
    const players = this.playerService.getSelectedPlayers();
    switch (gameType){
      case (GameTypes.Game501):
        this.game = new Game501(players);
    }
  }

  getPlayers(): Player[]{
    if(this.game)
      return this.game?.getPlayers();
    
    return [];
  }
}
