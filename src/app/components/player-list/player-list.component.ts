import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameTypes } from 'src/app/models/game-types';
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
  allGameTypes = GameTypes;
  selectedPlayersNumber = 0;
  form = this.fb.group({
    players: this.fb.array([]),
    gameType: this.fb.control(501)
  });

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private fb: FormBuilder){
    
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    this.players.forEach(player => this.playersFormArray.push(this.addPlayerControl(this.playerService.checkSelectionPlayer(player.id))));
    this.selectedPlayersNumber = this.playerService.getSelectedPlayers().length;
  }

  get playersFormArray(): FormArray{
    return this.form.get("players") as FormArray;
  }

  private addPlayerControl(isSelected: boolean): FormGroup{
    return this.fb.group({
      player: this.fb.control(isSelected)
    })
  }

  removePlayer(id: number): void{
    this.playerService.removePlayer(id);
    this.selectedPlayersNumber = this.playerService.getSelectedPlayers().length;
  }

  selectPlayer(id: number): void{
    this.playerService.selectPlayer(id);
    this.selectedPlayersNumber = this.playerService.getSelectedPlayers().length;
  }

  addPlayer(): void{
    this.router.navigate(["add_player"]);
  }

  search(event: Event): void{
    this.players = this.playerService.searchPlayers((event.target as HTMLInputElement).value);
  }

  start(): void{
    this.router.navigate(['/game', this.form.controls.gameType.value]);
  }
}
