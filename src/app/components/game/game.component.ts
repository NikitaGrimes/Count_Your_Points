import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDartShot } from 'src/app/models/dart-shot';
import { GameTypes } from 'src/app/models/game-types';
import { Player } from 'src/app/models/player';
import { DartShot } from 'src/app/models/dart-result';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  players: Player[] = [];
  prevPoints: number[][] = [];
  pointsForm: FormGroup;
  dartsOnMove: number[] = [];

  constructor(
    private gameService: GameService,
    private router: Router,
    private fb: FormBuilder){
    this.pointsForm = this.fb.group({
      playersShots: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.gameService.initGame(GameTypes.Game501);
    this.players = this.gameService.getPlayers();
    this.dartsOnMove = Array(this.gameService.getShotNumber()).fill(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.players.forEach(_ => this.playersShots.push(this.addPlayerShotsArray()));

  }

  get playersShots(): FormArray{
    return this.pointsForm.get("playersShots") as FormArray;
  }

  addPlayerShotsArray(): FormArray{
    const formGroup: FormArray = this.fb.array([]);
    for(let i = 0; i < this.gameService.getShotNumber(); i++)
      formGroup.push(this.addShotGroup());
    
    return formGroup;
  }

  addShotGroup(): FormGroup{
    return this.fb.group({
      shot: this.fb.control(null, {nonNullable: true}),
      factor: this.fb.control(1, {nonNullable: true}),
    });
  }

  addPoints(): void{
    this.playersShots.value
    .forEach((playerShoot: IDartShot[]) => playerShoot
      .forEach(shot => {
        new DartShot(shot.shot, shot.factor);
      }));
    this.pointsForm.reset();
  }

  startNewGame(): void{
    this.router.navigate(["players"]);
  }
}
