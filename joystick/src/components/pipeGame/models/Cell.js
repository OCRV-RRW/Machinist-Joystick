import { Pipe } from "./Pipe";

export class Cell {
    x;
    y;
    pipe = null;
    path = null;
    isStart = false;

    constructor(x, y){
        this.x = x
        this.y = y
    }

    checkPosition(touchPosition, refRect) {
        return ((touchPosition.x >= refRect.x && touchPosition.x <= refRect.x + refRect.width)
            && (touchPosition.y >= refRect.y && touchPosition.y <= refRect.y + refRect.height))
    }


    tryAddPipe(color) {
        let pipe = new Pipe(color, false)
        if (this.checkPipe(pipe)) {
            this.pipe = pipe
            return true
        }
        return false
    }

    setIsStart(value) {
        this.isStart = value
    }

    tryReplacePath(path) {
        if (this.path === null) {
            this.path = path
            return true
        }

        return false
    }

    clear() {
        if (this.pipe !== null)
            this.pipe = null

        if (this.path !== null)
            this.path = null
    }

    checkPipe(pipe){
        if (this.pipe === null)
            return true
        return false
    }
}