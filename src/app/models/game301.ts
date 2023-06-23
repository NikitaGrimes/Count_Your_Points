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

    public saveShots(shots: DartShot[][]): boolean {
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
                
                if (lastPoint === 301)
                    this.winners = [this.players[i].username];
            }
            this.points[this.movesCount][i] = lastPoint;
        }

        return this.winners !== null;
    }

    public getClosestPoint(): number {
        let maxPoint = -Infinity;
        this.points[this.movesCount].forEach(point => {
            if (point > maxPoint)
                maxPoint = point;
        })
        return maxPoint;
    }
}
