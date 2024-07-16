import { Cell } from "./Cell";

export class EndCell extends Cell {
    color
    isStart = false

    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    setIsStart(value) {
        this.isStart = value
    }

    clear() {
        super.clear()
        this.setIsStart(false)
    }
    
    checkPipe(pipe) {
        if (!super.checkPipe(pipe)) {
            return false
        }

        return pipe.color === this.color
    }
}