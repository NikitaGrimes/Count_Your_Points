import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winner'
})
export class WinnerPipe implements PipeTransform {

  transform(value: string[] | null): string {
    if (value === null)
      return "";
    
    if (value[0] === "")
      return "It is Draw.";

    if (value.length === 1)
      return value[0] + " is a WINNER!";

    return value.join(", ") + " are the Winners!";
  }
}
