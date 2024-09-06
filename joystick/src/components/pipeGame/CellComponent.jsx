import "./GameGridElement.css"
import { EndCellComponent } from "./EndCellComponent"
import { PipeComponent } from "./PipeComponent"
import { useRef, useEffect } from "react"
import { CellsPath } from "./models/CellsPath"

export const CellComponent = ({ 
    cell, 
    onStart, 
    onEnd, 
    onEnter,
    addCellToCurrentPath, 
    replaceCurrentPath, 
    clearCellPath,
    touchEventsController,
    isDrag
}) => {
    const ref = useRef(null)
    
    useEffect(() => {
        touchEventsController.subscribe(pointerEnterHandler, "touchMove")
        touchEventsController.subscribe(pointerUpHandler, "touchEnd")
        return () => {
            touchEventsController.unsubscribe(pointerEnterHandler, "touchMove")
            touchEventsController.unsubscribe(pointerUpHandler, "touchEnd")
        }
    }, [])

    const pointerEnterHandler = (touchPosition, prevCell, currentColor) => {
        if (ref.current === null)
            return

        if (prevCell && cell === prevCell)
            return

        if (cell.checkPosition(touchPosition, ref.current.getBoundingClientRect()) === false)
            return

        if (isDrag.current) {
            if (cell.path !== null) {
                if ((cell.pipe.color !== currentColor))  {
                    onEnd(prevCell)
                    return
                }
                let newPath = new CellsPath()
                newPath.cells = cell.path.returnToCell(cell)
                replaceCurrentPath(newPath)
            }
            else {
                if ((Math.abs(cell.x - prevCell.x) + Math.abs(cell.y - prevCell.y)) >= 2) {
                    onEnd(prevCell)
                    return
                }

                if (cell.color && cell.color !== currentColor) {
                    onEnd(prevCell)
                    return
                }

                if (prevCell.color === currentColor && prevCell.isStart === false) {
                    onEnd(prevCell)
                    return
                }
            }

            onEnter(cell)
            cell.tryAddPipe(currentColor)

            cell.pipe.setDirection({ 
                x: cell.y - prevCell.y, 
                y: prevCell.x - cell.x 
            })
            
            if (prevCell !== null && prevCell.pipe !== null) {
                prevCell.pipe.setDirection({
                    x: cell.y - prevCell.y, 
                    y: prevCell.x - cell.x 
                })
            }

            addCellToCurrentPath(cell)
        }
    }

    const pointerUpHandler = (touchPosition) => {
        if (ref.current === null)
            return

        if (cell.checkPosition(touchPosition, ref.current.getBoundingClientRect()) === false)
            return

        if (cell.path !== null) 
        {
            if (isDrag.current) {
                onEnd(cell)
            }
            else {
                replaceCurrentPath(null)
                clearCellPath(cell.path)
            }
        }
    }   

    return (<>
        <div ref={ref}
        className="grid-element">
            {cell.color && 
                <EndCellComponent 
                    cell={cell} 
                    onStart= {onStart}
                    touchEventsController={touchEventsController}>
                </EndCellComponent>}
            {cell.pipe !== null && !cell.color &&  
            <PipeComponent pipe={cell.pipe}>
            </PipeComponent>}
        </div>
        </>)
}