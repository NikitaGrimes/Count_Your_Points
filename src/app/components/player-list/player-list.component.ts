import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  public players: Player[] = [];
  public selectedPlayersNumber = 0;
  public form = this.fb.group({
    players: this.fb.array([]),
    gameType: this.fb.control(501)
  });

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private fb: FormBuilder){
    this.subscription = playerService.$select.subscribe(count => this.selectedPlayersNumber = count);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    this.players.forEach(player => this.playersFormArray.push(this.addPlayerControl(this.playerService.checkSelectionPlayer(player.id))));
  }

  public get playersFormArray(): FormArray{
    return this.form.get("players") as FormArray;
  }

  private addPlayerControl(isSelected: boolean): FormGroup{
    return this.fb.group({
      player: this.fb.control(isSelected)
    })
  }

  public removePlayer(id: number): void{
    this.playerService.removePlayer(id);
  }

  public selectPlayer(id: number): void{
    this.playerService.selectPlayer(id);
  }

  public addPlayer(): void{
    this.router.navigate(["add_player"]);
  }

  public search(event: Event): void{
    this.players = this.playerService.searchPlayers((event.target as HTMLInputElement).value);
  }

  public start(): void{
    this.router.navigate(['/game', this.form.controls.gameType.value]);
  }
}
