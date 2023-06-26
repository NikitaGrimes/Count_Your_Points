import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDartShot } from 'src/app/models/idart-shot';
import { DartShot } from 'src/app/models/dart-shot';
import { Game } from 'src/app/models/game';
import { PlayerService } from 'src/app/services/player.service';
import { GameCreator } from 'src/app/models/game-creator';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit{
  public game: Game;
  public moveInfo: number[];
  public closestPoint: number;
  public pointsForm: FormGroup;
  public moveIndexInfo: number | null = null;

  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute){
      this.pointsForm = this.fb.group({
        playersShots: this.fb.array([])
      });
      
      const gameType = this.activateRoute.snapshot.params['gameType'];
      this.game = GameCreator.create(+gameType, this.playerService.getSelectedPlayers());
      this.closestPoint = this.game.getClosestPoint();
      this.moveInfo = new Array(this.game.players.length).fill(0);
  }

  ngOnInit(): void {
    this.game.players.forEach(() => this.playersShots.push(this.addPlayerShotsArray()));
  }

  public get playersShots(): FormArray{
    return this.pointsForm.get("playersShots") as FormArray;
  }

  public addPlayerShotsArray(): FormArray{
    const formArray: FormArray = this.fb.array([]);
    for(let i = 0; i < this.game.dartInMove; i++)
      formArray.push(this.addShotGroup());
      
    return formArray;
  }

  public addShotGroup(): FormGroup{
    return this.fb.group({
      shot: this.fb.control(null, {nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d+$/)]}),
      factor: this.fb.control(1, {nonNullable: true}),
    });
  }

  public saveShots(): void{
    if (this.pointsForm.valid) {
      const playersShots = this.getPlayersShots();
      this.game.saveShots(playersShots);
      this.closestPoint = this.game.getClosestPoint();
      this.pointsForm.reset();
    }
  }

  private getPlayersShots(): DartShot[][]{
    return this.playersShots.value
    .map((playerShoot: IDartShot[]) => playerShoot
      .map(shot => new DartShot(shot.shot, shot.factor)));
  }

  public getMoveInfo(moveIndex: number | null): void{
    this.moveIndexInfo = moveIndex;
    if (moveIndex !== null)
      for (let index = 0; index < this.moveInfo.length; index++){
        this.moveInfo[index] = Math.abs(this.game.points[moveIndex][index] - this.game.points[moveIndex - 1][index]);
      }
  }

  public restart(): void{
    this.game.reset();
    this.closestPoint = this.game.getClosestPoint();
  }

  public get winners(): string[] | null{
    return this.game.getWinners();
  }

  public get isFinish() : boolean{
    return this.game.checkResult();
  }
}
