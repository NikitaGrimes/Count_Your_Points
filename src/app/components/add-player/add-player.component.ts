import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Player } from 'src/app/models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  form = new FormGroup({
    nickname: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/) //not only spaces
    ]),
    email: new FormControl('',
    Validators.email)
  });

  constructor(private location: Location,
    private playerService: PlayerService,
    private router: Router){

  }

  save(): void{
    if (this.form.valid){
      this.playerService.addPlayer(new Player(<string>this.form.get("nickname")?.value, this.form.get("email")?.value));
      this.router.navigate(["/players"]);
    }
  }
}
