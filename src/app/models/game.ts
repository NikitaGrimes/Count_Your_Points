import { Player } from "./player";
import { DartShot } from "./dart-shot";

export abstract class Game {
    abstract startPoint: number;
    abstract dartInMove: number;
    protected winners: string[] | null = [];
    protected isFinished = false;
    lastShotsPoints: number[] = [];
    
    constructor(public players: Player[]){

    }

    abstract pushShotsResult(shots: DartShot[][]): string[] | null ;
    abstract getClosestPoint(): number;

    getPlayersPoints(): number[]{
        return this.players.map(player => player.points);
    }
}
