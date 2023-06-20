import { Player } from "./player";
import { DartShot } from "./dart-result";

export abstract class Game {
    abstract startPoint: number;
    abstract dartInMove: number;
    
    constructor(public players: Player[]){

    }

    abstract pushShotsResult(shots: DartShot[][]): void;

    getPlayers(): Player[]{
        return this.players;
    }
}
