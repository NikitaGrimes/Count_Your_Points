import { Player } from "./player";
import { DartShot } from "./dart-shot";

export abstract class Game {
    abstract startPoint: number;
    abstract dartInMove: number;
    protected winners: string[] | null = null;
    protected isFinished = false;
    lastShotsPoints: number[] = [];
    
    constructor(public players: Player[]){

    }

    abstract pushShotsResult(shots: DartShot[][]): string[] | null ;
    abstract getClosestPoint(): number;

    reset(): void{
        this.players.forEach(player => player.points = this.startPoint);
        this.winners = null;
        this.isFinished = false;
    }

    getPlayersPoints(): number[]{
        return this.players.map(player => player.points);
    }
}
