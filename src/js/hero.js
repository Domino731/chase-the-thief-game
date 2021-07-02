// class for a hero, which is contains start position and actual direction
export class Hero{
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        // direction on which hero will be moving, at start it will be right
        this.direction = "right"
    }
}