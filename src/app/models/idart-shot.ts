export interface IDartShot {
    shot: number | null;
    factor: number;
    
    getShotResult(): number;
}
