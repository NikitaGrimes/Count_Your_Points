import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import { GameType } from 'src/app/models/game-type';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit{
  public players: Player[] = [];
  public gameTypes = GameType;
  public selectedPlayers = this.playerService.select$.pipe(map(count => count <= 1));
  public form = this.fb.group({
    gameType: this.fb.control(this.gameTypes.Game501)
  });

  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  public removePlayer(id: number): void{
    this.playerService.removePlayer(id);
  }

  public selectPlayer(id: number): void{
    this.playerService.selectPlayer(id);
  }

  public search(event: Event): void{
    this.players = this.playerService.searchPlayers((event.target as HTMLInputElement).value);
  }

  public get gameType(): GameType{
    return <GameType>this.form.controls.gameType.value;
  }

  public checkSelection(id: number): boolean{
    return this.playerService.checkSelectionPlayer(id);
  }
}
