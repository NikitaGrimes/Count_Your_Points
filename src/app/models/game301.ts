import { DartShot } from "./dart-shot";
import { Game } from "./game";
import { Player } from "./player";

export class Game301 extends Game{
    public startPoint = 0;
    public dartInMove = 3;
    
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
                if (lastPoints + shotsResult[index] <= 301){
                    lastPoints += shotsResult[index];
                }
                this.players.forEach((points, opponent) => {
                    if (points[points.length - 1] === lastPoints && opponent !== player)
                        lastPoints = 0;
                });

                if (lastPoints === 301)
                    this.winners = [player.username];
            }
            playerPoints.push(lastPoints);
            index++;
        });

        return this.winners !== null;
    }

    public getClosestPoint(): number {
        let maxPoint = -Infinity;
        this.players.forEach(points => {
            if (points[points.length - 1] > maxPoint)
                maxPoint = points[points.length - 1];
        })
        return maxPoint;
    }
}
