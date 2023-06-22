import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winner'
})
export class WinnerPipe implements PipeTransform {
  public transform(value: string[] | null): string {
    if (value === null) return "";
    
    switch(value.length){
      case 0:
        return "It is Draw.";
      case 1:
        return value[0] + " is a WINNER!";
      default:
        return value.join(", ") + " are the Winners!";
    }
  }
}
