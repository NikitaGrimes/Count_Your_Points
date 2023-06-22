import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [
    new Player("qwe", "", 0),
    new Player("asd", "", 1),
    new Player("zxc", "", 2),
    new Player("rty", "", 3),
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  getPlayers(): Player[]{
    return this.players;
  }
  
  getSelectedPlayers(): Player[]{
    return this.players.filter(player => player.isSelected);
  }

  addPlayer(player: Player): void{
    player.id = Math.max(...this.players.map(user => user.id)) + 1;
    player.id = player.id < 0 ? 0 : player.id;
    this.players.push(player);
  }

  removePlayer(id: number): void{
    const index = this.players.findIndex(player => player.id === id);
    this.players.splice(index, 1);
  }

  selectPlayer(id: number): void{
    const index = this.players.findIndex(player => player.id === id);
    this.players[index].isSelected = !this.players[index].isSelected;
  }

  searchPlayers(term: string): Player[]{
    if (!term.trim())
      return this.players;

    return this.players.filter(player => player.username.toLowerCase().includes(term.toLowerCase()));
  }
}
