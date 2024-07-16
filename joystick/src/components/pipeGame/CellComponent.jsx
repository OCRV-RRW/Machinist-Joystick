import "./GameGridElement.css"
import { EndCellComponent } from "./EndCellComponent"
import { PipeComponent } from "./PipeComponent"
import { useRef, useContext, useState } from "react"
import { IsDragContext } from "./GridComponent"

export const CellComponent = ({ 
    cell, 
    onStart, 
    onEnd, 
    onEnter, 
    currentColor,
    addCellToCurrentPath, 
    replaceCurrentPath, 
    clearCellPath,
    prevCell 
}) => {
    const ref = useRef(null)
    const isDrag = useContext(IsDragContext)
    const [pipe, setPipe] = useState(null)

    const end = (cell) => {
        onEnd(cell)
    }

    const pointerEnterHandler = (e) => {
        if (isDrag) {
            if (cell.path !== null) {
                if ((cell.pipe.color !== currentColor))  {
                    end(prevCell)
                    return
                }
                let newPath = cell.path.returnToCell(cell)
                replaceCurrentPath(newPath)
            }
            else {
                if ((Math.abs(cell.x - prevCell.x) + Math.abs(cell.y - prevCell.y)) >= 2) {
                    end(prevCell)
                    return
                }

                if (cell.color && cell.color !== currentColor) {
                    end(prevCell)
                    return
                }
            }

            onEnter(cell)
            cell.tryAddPipe(currentColor)
            setPipe(cell.pipe)

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

    const pointerUpHandler = (e) => {
        if (cell.path !== null) 
        {
            if (isDrag) {
                end(cell)
            }
            else {
                replaceCurrentPath(null)
                clearCellPath(cell.path)
            }
        }
    }   

    return (<>
        <div ref={ref}
        onPointerEnter={pointerEnterHandler}
        onPointerUp={pointerUpHandler}
        className="grid-element">
            {cell.color && 
                <EndCellComponent 
                    cell={cell} 
                    onStart= {onStart}>
                </EndCellComponent>}
            {cell.pipe !== null && !cell.color &&  
            <PipeComponent pipe={cell.pipe}>
            </PipeComponent>}
        </div>
        </>)
}