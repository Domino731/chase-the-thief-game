// class for thief, position is generated randomly
export class Thief{
    constructor() {
        this.position = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }
}