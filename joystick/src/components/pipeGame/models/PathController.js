export class PathController {
    paths = []

    addPath(path) {
        this.paths.push(path)
    }

    clearPath(path) {
        path.clear()
    }
}