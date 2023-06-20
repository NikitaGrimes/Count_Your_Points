import { Player } from "./player";

export abstract class Game {
    abstract startPoint: number;
    abstract dartInMove: number;
    
    constructor(public players: Player[]){

    }

    getPlayers(): Player[]{
        return this.players;
    }
}
