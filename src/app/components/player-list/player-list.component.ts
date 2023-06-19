import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit{
  players: Player[] = [];
  game301 = false;
  game501 = false;

  constructor(private playerService: PlayerService,
    private router: Router){
    
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    console.log(this.players);
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
        this.game301 = true;
        this.game501 = false;
        break;
      case 501:
        this.game301 = false;
        this.game501 = true;
        break;
      default:
        this.game301 = false;
        this.game501 = false;
    }
  }

  start(): void{
    console.log("start");
  }
}
