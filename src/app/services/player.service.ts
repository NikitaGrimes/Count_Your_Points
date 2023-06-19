import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [
    new Player("name", "email", 1),
    new Player("name1", "email1", 2),
    new Player("name2", "email2", 3),
    new Player("name3", "email3", 4),
    new Player("name4", "email4", 5),
    new Player("name5", "email5", 6)
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  getPlayers(): Player[]{
    return this.players;
  }

  addPlayer(player: Player): void{
    player.id = Math.max(...this.players.map(user => user.id)) + 1;
    this.players.push(player);
  }

  removePlayer(id: number): Player[]{
    const index = this.players.findIndex(player => player.id === id);
    this.players.splice(index, 1);
    return this.players;
  }

  selectPlayer(id: number):Player[]{
    const index = this.players.findIndex(player => player.id === id);
    this.players[index].isSelected = !this.players[index].isSelected;
    return this.players;
  }

  searchPlayers(term: string): Player[]{
    if (!term.trim())
      return this.players;

    return this.players.filter(player => player.username.includes(term));
  }
}
