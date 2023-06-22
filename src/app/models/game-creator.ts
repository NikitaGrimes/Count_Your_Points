import { Game } from "./game";
import { Game301 } from "./game301";
import { Game501 } from "./game501";
import { Player } from "./player";

export class GameCreator {
    static create(gameType: number, players: Player[]): Game{
        switch(gameType){
            case 301:
              return new Game301(players);
            case 501:
            default:
              return new Game501(players);
          }
    }
}
