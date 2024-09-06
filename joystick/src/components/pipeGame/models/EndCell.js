import { Cell } from "./Cell";
import { Pipe } from "./Pipe";

export class EndCell extends Cell {
    color
    isStart = false

    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    tryAddPipe(color) {
        let pipe = new Pipe(color, true)
        if (this.checkPipe(pipe)) {
            this.pipe = pipe
            return true
        }
        return false
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