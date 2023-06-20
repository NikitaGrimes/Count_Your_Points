import { DartShot } from "./dart-shot";
import { Game } from "./game";
import { Player } from "./player";

export class Game301 extends Game{
    startPoint = 0;
    finishPoint = 301;
    dartInMove = 3;
    
    constructor(players: Player[]){
        super(players);
        players.forEach(player => player.points = this.startPoint);
    }

    pushShotsResult(shots: DartShot[][]): string[] | null {
        return null;
    }

    getClosestPoint(): number {
        return 0
    }
}
