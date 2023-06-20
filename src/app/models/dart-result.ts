export class DartShot{
    constructor(
        public shot: number | null,
        public factor: number
    ){

    }

    getShotResult(): number{
        return this.shot === null ? 0 : (this.shot * this.factor);
    }

    isDoubleFactor(): boolean{
        return this.factor === 2;
    }
}