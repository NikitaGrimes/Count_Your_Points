import { Game } from "./game";
import { Player } from "./player";
import { DartShot } from "./dart-shot";

export class Game501 extends Game{
    public startPoint = 501;
    public dartInMove = 3;
    private limitedMoves = 20;
    private additionalMoves = 10;
    private isLastShotDouble: boolean[];

    constructor(players: Player[]){
        super(players);
        this.points[0].fill(this.startPoint);
        this.isLastShotDouble = Array(players.length).fill(false);
    }

    public saveShots(shots: DartShot[][]): void {
        this.movesCount++;
        const shotsResult = shots.map(playerShot => playerShot.reduce((prev, curr) => prev + curr.getShotResult(), 0));
        this.points.push([...this.points[this.movesCount - 1]]);
        for (let i = 0; i < shotsResult.length; i++){
            let lastPoints = this.points[this.movesCount][i];
            if (shotsResult[i] !== 0 && lastPoints - shotsResult[i] >= 2)
                lastPoints -= shotsResult[i];

            this.isLastShotDouble[i] = this.checkLastDoubleShot(shots[i]);
            if (lastPoints - shotsResult[i] === 0 && this.isLastShotDouble[i])
                lastPoints = 0;

            this.points[this.movesCount][i] = lastPoints;
        }

    }

    public checkResult(): boolean {
        this.players.forEach((player, index) => {
            if (this.points[this.movesCount][index] === 0)
                this.winners ? this.winners.push(this.players[index].username) : (this.winners = [this.players[index].username]);
        });

        if (this.movesCount >= this.limitedMoves){
            const minPoint = this.getClosestPoint();
            let minCount = 0;
            this.points[this.movesCount].forEach((point, index) => {
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
        return Math.min(...this.points.flat(2));
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
