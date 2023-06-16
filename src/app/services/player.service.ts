import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [
    new Player("name", "email"),
    new Player("name1", "email1"),
    new Player("name2", "email2"),
    new Player("name3", "email3"),
    new Player("name4", "email4"),
    new Player("name5", "email5")
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  getPlayers(): Player[]{
    return this.players;
  }

  addPlayer(player: Player): void{
    this.players.push(player);
  }
}
