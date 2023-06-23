export class DartShot{
    constructor(
        public shot: number | null,
        public factor: number){

    }

    public getShotResult(): number{
        return this.shot === null ? 0 : (Math.floor(this.shot) * this.factor);
    }

    public isDoubleFactor(): boolean{
        return this.factor === 2;
    }
}
