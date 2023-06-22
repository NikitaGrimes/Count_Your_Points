import { Game } from "./game";
import { Player } from "./player";
import { DartShot } from "./dart-shot";

export class Game501 extends Game{
    public startPoint = 501;
    public dartInMove = 3;
    private limitedMoves = 20;
    private additionalMoves = 10;

    constructor(players: Player[]){
        super(players);
        players.forEach(player => this.players.set(player, [this.startPoint]));
    }

    public saveShots(shots: DartShot[][]): boolean {
        this.movesCount++;
        const shotsResult = shots.map(playerShot => playerShot.reduce((prev, curr) => prev + curr.getShotResult(), 0));
        let index = 0;
        this.players.forEach((playerPoints, player) => {
            let lastPoints = playerPoints[playerPoints.length - 1];
            if (shotsResult[index] !== 0){
                if (lastPoints - shotsResult[index] >= 2)
                    lastPoints -= shotsResult[index];

                if (playerPoints[playerPoints.length - 1] - lastPoints === 0 && this.checkLastDoubleShot(shots[index])){
                    this.winners ? this.winners.push(player.username) : (this.winners = [player.username]);
                    lastPoints -= shotsResult[index];
                }
            }
            playerPoints.push(lastPoints);
                
            index++;
        });

        if (this.movesCount >= this.limitedMoves){
            const minPoints = this.getClosestPoint();
            let minCount = 0;
            this.players.forEach((points, player) => {
                if (points[points.length - 1] === minPoints){
                    minCount++;
                    this.winners = [player.username];
                }
            })
            if (minCount > 1)
                this.winners = null
        }

        if (this.movesCount >= this.limitedMoves + this.additionalMoves){
            this.winners = [];
        }

        return this.winners !== null;
    }

    public getClosestPoint(): number {
        let minPoint = +Infinity;
        this.players.forEach(points => {
            if (points[points.length - 1] < minPoint)
                minPoint = points[points.length - 1];
        })
        return minPoint;
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

    public override reset(): void {
        super.reset();
        this.movesCount = 0;
    }
}
