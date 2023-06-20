import { IDartShot } from "./idart-shot";

export class DartShot implements IDartShot{
    constructor(
        public shot: number | null,
        public factor: number){

    }

    getShotResult(): number{
        return this.shot === null ? 0 : (this.shot * this.factor);
    }

    isDoubleFactor(): boolean{
        return this.factor === 2;
    }
}
