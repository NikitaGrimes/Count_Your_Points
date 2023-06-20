import { Game } from "./game";
import { Player } from "./player";
import { DartShot } from "./dart-result";

export class Game501 extends Game{
    startPoint = 501;
    dartInMove = 3;

    constructor(players: Player[]){
        super(players);
        players.forEach(player => player.points = this.startPoint);
    }

    pushShotsResult(shots: DartShot[][]): void {
        for (let i = 0; i < this.players.length; i++){
            shots[i].forEach(shot => this.players[i].points -= shot.getShotResult());
        }
    }
}
