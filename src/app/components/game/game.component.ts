import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDartShot } from 'src/app/models/idart-shot';
import { Player } from 'src/app/models/player';
import { DartShot } from 'src/app/models/dart-shot';
import { Game } from 'src/app/models/game';
import { PlayerService } from 'src/app/services/player.service';
import { GameCreator } from 'src/app/models/game-creator';

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
  private game: Game;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute){
      this.pointsForm = this.fb.group({
        playersShots: this.fb.array([])
      });
      
      const gameType = this.activateRoute.snapshot.params['gameType'];
      this.players = this.playerService.getSelectedPlayers();
      this.game = GameCreator.create(+gameType, this.players);
  }

  ngOnInit(): void {
      this.dartsInMove = Array(this.game.dartInMove).fill(0);
      this.players.forEach(() => this.playersShots.push(this.addPlayerShotsArray()));
      this.closestPoint = this.game.startPoint;
      this.points.unshift(new Array(this.players.length).fill(this.closestPoint));
      this.shotPoints.unshift(new Array(this.players.length).fill(0));
  }

  get playersShots(): FormArray{
      return this.pointsForm.get("playersShots") as FormArray;
  }

  addPlayerShotsArray(): FormArray{
      const formGroup: FormArray = this.fb.array([]);
      for(let i = 0; i < this.game.dartInMove; i++)
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
      this.winners = this.game.pushShotsResult(playersShots);
      this.points.unshift(this.game.getPlayersPoints());
      this.shotPoints.unshift(this.game.lastShotsPoints);
      this.closestPoint = this.game.getClosestPoint();
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
      this.game.reset();
      this.winners = null;
      this.isEndGame = false;
      this.closestPoint = this.game.getClosestPoint();
      this.shotPoints = [];
      this.shotPoints.unshift(new Array(this.players.length).fill(0));
      this.points = [];
      this.points.push(this.game.getPlayersPoints());
  }
}
