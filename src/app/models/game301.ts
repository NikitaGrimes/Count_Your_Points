import { DartShot } from "./dart-shot";
import { Game } from "./game";
import { Player } from "./player";

export class Game301 extends Game{
    startPoint = 0;
    dartInMove = 3;
    
    constructor(players: Player[]){
        super(players);
        players.forEach(player => player.points = this.startPoint);
        this.winners = null;
    }

    pushShotsResult(shots: DartShot[][]): string[] | null {
        this.lastShotsPoints = new Array(this.players.length).fill(0);
        for (let i = 0; i < this.players.length; i++){
            const shotResult = shots[i].reduce((prevValue, shot) => shot.getShotResult() + prevValue, 0);
            if (shotResult !== 0 && this.players.map(player => player.points).includes(this.players[i].points + shotResult)){
                this.lastShotsPoints[i] = shotResult;
                this.players[i].points = 0;
            } else if (this.players[i].points + shotResult === 301){
                this.lastShotsPoints[i] = shotResult;
                this.players[i].points += shotResult;
                this.winners = [this.players[i].username];
            } else if (this.players[i].points + shotResult < 301){
                this.lastShotsPoints[i] = shotResult;
                this.players[i].points += shotResult;
            }
        }

        return this.winners;
    }

    getClosestPoint(): number {
        return Math.max(...this.players.map(player => player.points));
    }
}
