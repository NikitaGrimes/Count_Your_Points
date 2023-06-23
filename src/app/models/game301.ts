import { DartShot } from "./dart-shot";
import { Game } from "./game";
import { Player } from "./player";

export class Game301 extends Game{
    public startPoint = 0;
    public dartInMove = 3;
    
    constructor(players: Player[]){
        super(players);
        this.points[0].fill(this.startPoint);
    }

    public saveShots(shots: DartShot[][]): void {
        this.movesCount++;
        const shotResults = shots.map(playerShot => playerShot.reduce((prev, curr) => prev + curr.getShotResult(), 0));
        this.points.push([...this.points[this.movesCount - 1]]);
        for (let i = 0; i < shotResults.length; i++){
            let lastPoint = this.points[this.movesCount][i];
            if (shotResults[i] !== 0){
                if (lastPoint + shotResults[i] <= 301){
                    lastPoint += shotResults[i];
                    this.players.forEach((_, index) => {
                        if (this.points[this.movesCount][index] === lastPoint)
                            lastPoint = 0;
                    });
                }
            }
            this.points[this.movesCount][i] = lastPoint;
        }
    }

    public getClosestPoint(): number {
        return Math.max(...this.points.flat(2));
    }

    public checkResult(): boolean{
        this.players.forEach((player, index) => {
            if (this.points[this.movesCount][index] === 301)
                this.winners = [player.username];
        })

        return this.winners !== null;
    }
}
