import { DartShot } from "./dart-shot";
import { Game } from "./game";
import { Player } from "./player";

export class Game301 extends Game{
    startPoint = 0;
    dartInMove = 3;
    
    constructor(players: Player[]){
        super(players);
        players.forEach(player => this.players.set(player, [this.startPoint]));
    }

    saveShots(shots: DartShot[][]): boolean {
        const shotsResult = shots.map(playerShot => playerShot.reduce((prev, curr) => prev + curr.getShotResult(), 0));
        let index = 0;
        this.players.forEach((playerPoints, player) => {
            let lastPoints = playerPoints[playerPoints.length - 1];
            if (shotsResult[index] !== 0){
                if (lastPoints + shotsResult[index] <= 301){
                    lastPoints += shotsResult[index];
                    playerPoints.push(lastPoints);
                }
                this.players.forEach((points, opponent) => {
                    if (points[points.length - 1] === lastPoints && opponent !== player)
                        playerPoints[playerPoints.length - 1] = 0;
                });

                if (playerPoints[playerPoints.length - 1] === 301)
                    this.winners = [player.username];
            }
                
            index++;
        });

        return this.winners !== null;
    }

    getClosestPoint(): number {
        let maxPoint = -Infinity;
        this.players.forEach(points => {
            if (points[points.length - 1] > maxPoint)
                maxPoint = points[points.length - 1];
        })
        return maxPoint;
    }
}
