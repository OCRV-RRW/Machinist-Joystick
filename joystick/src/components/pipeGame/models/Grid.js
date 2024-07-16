import { Cell } from "./Cell";
import { EndCell } from "./EndCell";

export class Grid {
    cells = [[], [], [], [], []];

    addCell(x, y, isEndPoint, color) {
        if (!isEndPoint)
            this.cells[x][y] = new Cell(x, y)
        else
            this.cells[x][y] = new EndCell(x, y, color)
    }

    clear() {
        this.cells.map((row) => {
            row.map((cell) => {cell.clear()})
        })
    }
}