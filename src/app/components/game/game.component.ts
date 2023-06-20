import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDartShot } from 'src/app/models/idart-shot';
import { Player } from 'src/app/models/player';
import { DartShot } from 'src/app/models/dart-shot';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  players: Player[] = [];
  prevShots: number[][] = [];
  prevShotsPoint: number[][] = [];
  dartsInMove: number[] = [];
  isEndGame = false;
  closestPoint = 0;
  pointsForm: FormGroup;
  winners: string[] | null = null;

  constructor(
    private gameService: GameService,
    private router: Router,
    private fb: FormBuilder){
    this.pointsForm = this.fb.group({
      playersShots: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.players = this.gameService.getPlayers();
    this.dartsInMove = Array(this.gameService.getDartInMove()).fill(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.players.forEach(_ => this.playersShots.push(this.addPlayerShotsArray()));
    this.closestPoint = this.gameService.getStartPoint();
    this.prevShots.unshift(new Array(this.players.length).fill(this.closestPoint));
    this.prevShotsPoint.unshift(new Array(this.players.length).fill(0));
  }

  get playersShots(): FormArray{
    return this.pointsForm.get("playersShots") as FormArray;
  }

  addPlayerShotsArray(): FormArray{
    const formGroup: FormArray = this.fb.array([]);
    for(let i = 0; i < this.gameService.getDartInMove(); i++)
      formGroup.push(this.addShotGroup());
    
    return formGroup;
  }

  addShotGroup(): FormGroup{
    return this.fb.group({
      shot: this.fb.control(null, {nonNullable: true}),
      factor: this.fb.control(1, {nonNullable: true}),
    });
  }

  saveShots(): void{
    const playersShots: DartShot[][] = this.playersShots.value
    .map((playerShoot: IDartShot[]) => playerShoot
      .map(shot => new DartShot(shot.shot, shot.factor)));
    this.winners = this.gameService.pushShotsResult(playersShots);
    this.prevShots.unshift(this.gameService.getPlayersPoints());
    this.prevShotsPoint.unshift(this.gameService.getLastShotsPoints());
    this.closestPoint = this.gameService.getClosestPoint();
    this.pointsForm.reset();
    if (this.winners !== null){
      this.isEndGame = true;
    }
  }

  startNewGame(): void{
    this.router.navigate(["players"]);
  }

  getMoveInfo(moveIndex: number): void{
    [this.prevShots[moveIndex], this.prevShotsPoint[moveIndex]] = [this.prevShotsPoint[moveIndex], this.prevShots[moveIndex]];
  }
}
