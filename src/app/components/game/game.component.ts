import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  dartsInMove: number[] = [];
  points: number[][] = [];
  shotPoints: number[][] = [];
  isEndGame = false;
  closestPoint = 0;
  winners: string[] | null = null;
  pointsForm: FormGroup;

  constructor(
    private gameService: GameService,
    private router: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute){
      this.pointsForm = this.fb.group({
        playersShots: this.fb.array([])
      });
  }

  ngOnInit(): void {
      const gameType = this.activateRoute.snapshot.params['gameType'];
      this.gameService.initGame(+gameType);
      this.players = this.gameService.getPlayers();
      this.dartsInMove = Array(this.gameService.getDartInMove()).fill(0);
      this.players.forEach(() => this.playersShots.push(this.addPlayerShotsArray()));
      this.closestPoint = this.gameService.getStartPoint();
      this.points.unshift(new Array(this.players.length).fill(this.closestPoint));
      this.shotPoints.unshift(new Array(this.players.length).fill(0));
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
      this.points.unshift(this.gameService.getPlayersPoints());
      this.shotPoints.unshift(this.gameService.getLastShotsPoints());
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
      [this.points[moveIndex], this.shotPoints[moveIndex]] = [this.shotPoints[moveIndex], this.points[moveIndex]];
  }

  restart(): void{
      this.gameService.resetGame();
      this.winners = null;
      this.isEndGame = false;
      this.closestPoint = this.gameService.getClosestPoint();
      this.shotPoints = [];
      this.shotPoints.unshift(new Array(this.players.length).fill(0));
      this.points = [];
      this.points.push(this.gameService.getPlayersPoints());
  }
}
