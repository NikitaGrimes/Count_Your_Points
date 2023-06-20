import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameTypes } from 'src/app/models/game-types';
import { Player } from 'src/app/models/player';
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private gameService: GameService,
    private router: Router,
    private fb: FormBuilder){
    this.pointsForm = this.fb.group({
      points: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.gameService.initGame(GameTypes.Game501);
    this.players = this.gameService.getPlayers();
    this.players.forEach(_ => this.points.push(this.addPointForm()));
  }

  get points(): FormArray{
    return this.pointsForm.get("points") as FormArray;
  }

  addPointForm(): FormGroup{
    return new FormGroup({
      shot1: new FormControl(''),
      factor1: new FormControl(1),
      shot2: new FormControl(''),
      factor2: new FormControl(1),
      shot3: new FormControl(''),
      factor3: new FormControl(1)
    });
  }

  addPoints(): void{
    console.log(this.pointsForm.value);
  }

  startNewGame(): void{
    this.router.navigate(["players"]);
  }
}
