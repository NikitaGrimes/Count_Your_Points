import { Player } from "./player";

export abstract class Game {
    abstract startPoint: number;
    
    constructor(public players: Player[]){

    }

    getPlayers(): Player[]{
        return this.players;
    }
}
