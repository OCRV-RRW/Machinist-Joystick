export class CellsPath {
    cells = []

    tryAddCell(cell) {
        if (this.findCell(cell) !== undefined)
            return false

        this.cells.push(cell)
        cell.tryReplacePath(this)
        return true
    }

    findCell(cell) {
        let findCell = this.cells.find((c) => c === cell)
        return findCell
    }

    check() {
        let countEndCells = 0
        this.cells.forEach(c => {
            if (c.color)
                countEndCells++
        });

        if (countEndCells === 2)
            return true
        
        return false
    }

    returnToCell(cell) {
        let indexCurrentCell = this.cells.findIndex(c => c === cell)
        let clearingCells = this.cells.filter((c, idx) => idx > indexCurrentCell)

        clearingCells.forEach((c) => c.clear())
        this.cells = this.cells.slice(0, indexCurrentCell + 1)
        return this.cells
    }
    
    clear() {
        this.cells.map((cell) => cell.clear())
        this.cells = []
    }
}