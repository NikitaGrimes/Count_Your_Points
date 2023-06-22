import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import {  Validators, FormBuilder} from '@angular/forms';
import { Player } from 'src/app/models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayerComponent {
  form = this.fb.group({
    nickname: ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), //not only spaces
    ]],
    email: ['', Validators.email]
  })

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router){
      
  }

  save(): void{
    if (this.form.valid){
      this.playerService.addPlayer(new Player(<string>this.form.controls.nickname.value, this.form.controls.email.value));
      this.router.navigate(["/players"]);
    }
  }
}
