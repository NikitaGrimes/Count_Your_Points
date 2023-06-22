import { Player } from "./player";
import { DartShot } from "./dart-shot";

export abstract class Game {
    abstract startPoint: number;
    abstract dartInMove: number;

    protected players: Map<Player, number[]> = new Map();
    protected winners: string[] | null = null;
    
    constructor(players: Player[]){
        players.forEach(player => this.players.set(player, [this.startPoint]));
    }

    abstract getClosestPoint(): number;
    abstract saveShots(shots: DartShot[][]): boolean;

    public reset(): void{
        this.players.forEach((_, player) => this.players.set(player, [this.startPoint]))
        this.winners = null;
    }

    public getCurrentPoints(): number[]{
        return Array.from(this.players.values()).map(points => points[points.length - 1]);
    }

    public getWinners(): string[] | null{
        return this.winners;
    }
}
