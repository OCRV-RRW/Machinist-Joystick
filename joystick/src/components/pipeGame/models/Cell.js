export class Cell {
    x;
    y;
    pipe = null;
    path = null;
    isStart = false

    constructor(x, y){
        this.x = x
        this.y = y
    }

    tryAddPipe(pipe) {
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