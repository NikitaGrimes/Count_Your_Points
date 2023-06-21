import { Game } from "./game";
import { Player } from "./player";
import { DartShot } from "./dart-shot";

export class Game501 extends Game{
    startPoint = 501;
    dartInMove = 3;
    movesCount = 0;
    limitedMoves = 20;
    additionalMoves = 10;

    constructor(players: Player[]){
        super(players);
        players.forEach(player => player.points = this.startPoint);
    }

    pushShotsResult(shots: DartShot[][]): string[] | null {
        this.movesCount++;
        this.lastShotsPoints = new Array(this.players.length).fill(0);
        for (let i = 0; i < this.players.length; i++){
            const shotResult = shots[i].reduce((prevValue, shot) => shot.getShotResult() + prevValue, 0);
            if (this.players[i].points - shotResult >= 2){
                this.players[i].points -= shotResult;
                this.lastShotsPoints[i] = shotResult;
            }
            else if (this.players[i].points - shotResult === 0 && this.checkLastDoubleShot(shots[i])){
                this.players[i].points -= shotResult;
                this.lastShotsPoints[i] = shotResult;
                this.winners = this.winners ? this.winners : [];
                this.winners.push(this.players[i].username);
            }
        }

        if (this.movesCount >= this.limitedMoves){
            const minPoints = Math.min(...this.getPlayersPoints());
            if (this.getPlayersPoints().indexOf(minPoints) === this.getPlayersPoints().lastIndexOf(minPoints)){
                this.winners = this.winners ? this.winners : [];
                this.winners.push(this.players[this.getPlayersPoints().indexOf(minPoints)].username);
                return this.winners;
            }
        }

        if (this.movesCount >= this.limitedMoves + this.additionalMoves){
            this.winners = [];
        }

        return this.winners;
    }

    getClosestPoint(): number {
        return Math.min(...this.players.map(player => player.points));
    }

    private checkLastDoubleShot(dartShots: DartShot[]): boolean{
        for (let i = dartShots.length - 1; i >= 0; i--){
            if (dartShots[i].isDoubleFactor() && dartShots[i].shot !== 0)
                return true;
            else if (dartShots[i].shot !== 0)
                return false;
        }

        return false;
    }

    override reset(): void {
        super.reset();
        this.movesCount = 0;
    }
}
