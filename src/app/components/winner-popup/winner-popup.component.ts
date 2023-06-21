import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-winner-popup',
  templateUrl: './winner-popup.component.html',
  styleUrls: ['./winner-popup.component.scss']
})
export class WinnerPopupComponent {
  @Input() winners: string[] | null = null;
  @Output() restart = new EventEmitter<void>();

  reset(): void{
    this.restart.emit();
  }
}
