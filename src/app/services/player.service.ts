import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [
    new Player("Dr. Strange", "strange@gmail.com", 0),
    new Player("Stark", "stark@mail.ru", 1),
    new Player("Boby", "bob@gmail.com", 2),
    new Player("Google", "google@gmail.com", 3),
  ];
  public selectedIds: Set<number> = new Set();
  public $select = new BehaviorSubject<number>(0);

  public getPlayers(): Player[]{
    return this.players;
  }
  
  public getSelectedPlayers(): Player[]{
    return this.players.filter(player => this.selectedIds.has(player.id));
  }
  
  public getSelectedPlayersCount(): number{
    return this.selectedIds.size;
  }

  public addPlayer(player: Player): void{
    player.id = Math.max(...this.players.map(user => user.id)) + 1;
    player.id = player.id < 0 ? 0 : player.id;
    this.players.push(player);
  }

  public removePlayer(id: number): void{
    const index = this.players.findIndex(player => player.id === id);
    this.selectedIds.delete(id);
    this.$select.next(this.selectedIds.size);
    this.players.splice(index, 1);
  }

  public selectPlayer(id: number): void{
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id);
    this.$select.next(this.selectedIds.size);
  }

  public checkSelectionPlayer(id: number): boolean{
    return this.selectedIds.has(id);
  }

  public searchPlayers(term: string): Player[]{
    if (!term.trim())
      return this.players;

    return this.players.filter(player => player.username.toLowerCase().includes(term.toLowerCase()));
  }
}
