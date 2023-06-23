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
        this.points[0].fill(this.startPoint);
    }

    public saveShots(shots: DartShot[][]): boolean {
        this.movesCount++;
        const shotsResult = shots.map(playerShot => playerShot.reduce((prev, curr) => prev + curr.getShotResult(), 0));
        this.points.unshift([...this.points[0]]);
        for (let i = 0; i < shotsResult.length; i++){
            let lastPoints = this.points[0][i];
            if (shotsResult[i] !== 0){
                if (lastPoints - shotsResult[i] >= 2)
                    lastPoints -= shotsResult[i];

                if (lastPoints - shotsResult[i] === 0 && this.checkLastDoubleShot(shots[i])){
                    this.winners ? this.winners.push(this.players[i].username) : (this.winners = [this.players[i].username]);
                    lastPoints = 0;
                }

                this.points[0][i] = lastPoints;
            }
        }

        if (this.movesCount >= this.limitedMoves){
            const minPoint = this.getClosestPoint();
            let minCount = 0;
            this.points[0].forEach((point, index) => {
                if (point === minPoint){
                    minCount++;
                    this.winners ? this.winners.push(this.players[index].username) : (this.winners = [this.players[index].username]);
                }
            })
            
            if (minCount > 1)
                this.winners = null;

            if (this.movesCount >= this.limitedMoves + this.additionalMoves)
                this.winners = [];
        }

        return this.winners !== null;
    }

    public getClosestPoint(): number {
        let minPoint = +Infinity;
        this.points[0].forEach(point => {
            if (point < minPoint)
                minPoint = point;
        });

        return minPoint;
    }

    private checkLastDoubleShot(dartShots: DartShot[]): boolean{
        for (let i = dartShots.length - 1; i >= 0; i--){
            if (dartShots[i].isDoubleFactor() && dartShots[i].shot)
                return true;
            else if (dartShots[i].shot)
                return false;
        }

        return false;
    }

    public override reset(): void {
        super.reset();
        this.movesCount = 0;
    }
}
