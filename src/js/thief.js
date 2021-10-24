/**  class for thief */
export class Thief{
    constructor() {
        /** thief position in vertical and horizontal, position is generated randomly */
        this.position = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }
}