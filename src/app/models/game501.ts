import { Game } from "./game";
import { Player } from "./player";

export class Game501 extends Game{
    startPoint = 501;

    constructor(players: Player[]){
        super(players);
        players.forEach(player => player.points = this.startPoint);
    }
}
