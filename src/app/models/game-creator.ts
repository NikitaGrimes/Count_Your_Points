import { Game } from "./game";
import { GameType } from "./game-type";
import { Game301 } from "./game301";
import { Game501 } from "./game501";
import { Player } from "./player";

export class GameCreator {
    public static create(gameType: GameType, players: Player[]): Game{
        switch(gameType){
            case GameType.Game301:
              return new Game301(players);
            case GameType.Game501:
            default:
              return new Game501(players);
          }
    }
}
