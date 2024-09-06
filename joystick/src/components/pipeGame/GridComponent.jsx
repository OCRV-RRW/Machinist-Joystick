import React, { useState, useRef, useEffect } from "react";
import { CellComponent } from "./CellComponent";
import { CellsPath } from "./models/CellsPath";
import { PathController } from "./models/PathController";
import { TouchEventsController } from "./models/TouchEventsController";

export const GridComponent = ({grid, setGrid, checkStateGame}) => {
    const touchEventsController = useRef(new TouchEventsController())
    const [currentColor, setCurrentColor] = useState("")
    const isDragging = useRef(false)
    const currentPath = useRef(null)
    const [prevCell, setPrevCell] = useState(null)
    const [pathController, setPathController] = useState(new PathController())

    const onStart = (cell) => {
        setPrevCell(cell)
        setCurrentColor(cell.color)
        isDragging.current = true
        currentPath.current = new CellsPath()
        currentPath.current.tryAddCell(cell)
    }

    const addCellToCurrentPath = (cell) => {
        if (currentPath.current === null)
            return

        currentPath.current.tryAddCell(cell)
    }

    const replaceCurrentPath = (newPath) => {
        currentPath.current = newPath
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

        setCurrentColor("")
        isDragging.current = false
        setPrevCell(null)
        checkStateGame()
    }

    const onEnter = (cell) => {
        setPrevCell(cell)
    }

    const touchMoveHandler = (e) => {
        let touchPosition = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
        touchEventsController.current.invoke(touchPosition, "touchMove", prevCell, currentColor)
    }

    const touchEndHandler = (e) => {
        let touchPosition = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
        touchEventsController.current.invoke(touchPosition, "touchEnd")
    }

    return (<div className='game-grid'
            onTouchEnd={touchEndHandler}
            onTouchMove={touchMoveHandler}
            >
                    {grid.cells.map((row) => {
                        return row.map((cell) => {
                            return( 
                                <CellComponent 
                                    key={cell.x + "" + cell.y} 
                                    cell={cell} 
                                    onStart={onStart}
                                    onEnd={onEnd}
                                    onEnter={onEnter}
                                    addCellToCurrentPath={(cell) => {addCellToCurrentPath(cell)}}
                                    replaceCurrentPath={(newPath) => {replaceCurrentPath(newPath)}}
                                    clearCellPath={(path) => {clearCellPath(path)}}
                                    touchEventsController={touchEventsController.current}
                                    isDrag={isDragging}>
                                </CellComponent> 
                            )
                        })
                    })}
            </div>)
}