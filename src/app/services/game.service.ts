import { Injectable } from '@angular/core';
import { DartShot } from '../models/dart-shot';
import { Game } from '../models/game';
import { GameTypes } from '../models/game-types';
import { Game301 } from '../models/game301';
import { Game501 } from '../models/game501';
import { Player } from '../models/player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game = new Game501([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private playerService: PlayerService) 
  {

  }

  initGame(gameType: GameTypes): void{
    const players = this.playerService.getSelectedPlayers();
    switch (gameType){
      case (GameTypes.Game501):
        this.game = new Game501(players);
        break;
      case (GameTypes.Game301):
        this.game = new Game301(players);
        break;
    }
  }

  getPlayers(): Player[]{
    if(this.game)
      return this.game.players;
    
    return [];
  }

  getDartInMove(): number{
    return this.game.dartInMove;
  }

  getStartPoint(): number{
    return this.game.startPoint;
  }

  pushShotsResult(shots: DartShot[][]): string[] | null{
    return this.game.pushShotsResult(shots);
  }

  getPlayersPoints(): number[]{
    return this.game.players.map(player => player.points);
  }

  getLastShotsPoints(): number[]{
    return this.game.lastShotsPoints;
  }

  getClosestPoint(): number{
    return this.game.getClosestPoint();
  }
}
