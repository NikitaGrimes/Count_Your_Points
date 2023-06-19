export class Player {
    constructor(public username: string, 
        public email?: string | null, 
        public id = 0, 
        public points = 0,
        public isSelected = false){
        
    }
}
