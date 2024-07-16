import React, { useState } from "react";
import { CellComponent } from "./CellComponent";
import { CellsPath } from "./models/CellsPath";
import { PathController } from "./models/PathController";

export const IsDragContext = React.createContext()
export const CurrentPathContext = React.createContext()
export const CurrentCellContext = React.createContext()

export const GridComponent = ({grid, setGrid}) => {
    const [currentColor, setCurrentColor] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [currentPath, setCurrentPath] = useState(null)
    const [prevCell, setPrevCell] = useState(null)
    const [pathController, setPathController] = useState(new PathController())

    const onStart = (cell) => {
        setPrevCell(cell)
        setCurrentColor(cell.color)
        setIsDragging(true)
        let path = new CellsPath()
        setCurrentPath(path)
        path.tryAddCell(cell)
    }

    const addCellToCurrentPath = (cell) => {
        if (currentPath === null)
            return

        currentPath.tryAddCell(cell)
        setCurrentPath(currentPath)
    }

    const replaceCurrentPath = (newPath) => {
        setCurrentPath(newPath)
    }
    
    const clearCellPath = (path) => {
        let newPathController = new PathController()
        newPathController.clearPath(path)
        setPathController(newPathController)
    }

    const addCellPath = (path) => {
        let newPathController = pathController
        newPathController.addPath(path)
        setPathController(newPathController)
    }

    const onEnd = (cell) => {
        if (cell.path.check() === false) {
            clearCellPath(cell.path)
        }
        else {
            addCellPath(cell.path)
        }

        setCurrentColor(null)
        setIsDragging(false)
        setPrevCell(null)
    }

    const onEnter = (cell) => {
        setPrevCell(cell)
    }

    return (<div className='game-grid'>
            <IsDragContext.Provider value={isDragging}>
                    {grid.cells.map((row) => {
                        return row.map((cell) => {
                            return( 
                                <CellComponent 
                                    key={cell.x + "" + cell.y} 
                                    cell={cell} 
                                    onStart={onStart}
                                    onEnd={onEnd}
                                    onEnter={onEnter}
                                    currentColor={currentColor}
                                    addCellToCurrentPath={(cell) => {addCellToCurrentPath(cell)}}
                                    replaceCurrentPath={(newPath) => {replaceCurrentPath(newPath)}}
                                    clearCellPath={(path) => {clearCellPath(path)}}
                                    prevCell={prevCell}></CellComponent> 
                            )
                        })
                    })}
            </IsDragContext.Provider>
            </div>)
}