import { Player } from "./player";
import { DartShot } from "./dart-shot";

export abstract class Game {
    protected abstract startPoint: number;
    public abstract dartInMove: number;

    public players: Player[]
    public points: number[][] = [];
    protected winners: string[] | null = null;
    public movesCount = 0;
    
    constructor(players: Player[]){
        this.players = players;
        this.points.push(new Array(players.length));
    }

    public abstract getClosestPoint(): number;
    public abstract saveShots(shots: DartShot[][]): void;
    public abstract checkResult(): boolean;

    public reset(): void{
        this.points = [Array(this.players.length).fill(this.startPoint)];
        this.movesCount = 0;
        this.winners = null;
    }

    public getCurrentPoints(): number[]{
        return this.points[this.movesCount];
    }

    public getWinners(): string[] | null{
        return this.winners;
    }
}
