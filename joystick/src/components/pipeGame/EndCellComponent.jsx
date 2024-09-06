import { useEffect, useRef, useState } from 'react' 
import './GameEndPointElement.css'
import { EndPipeComponent } from './EndPipeComponent'

export const EndCellComponent = ({ 
    cell, 
    onStart
}) => {
    const pointerDownHandler = () => {
        if (cell.path !== null)
            return

        cell.tryAddPipe(cell.color)
        onStart(cell)
        cell.setIsStart(true)
    }

    return (
        <div
            onPointerDown={pointerDownHandler}
            className='end-element-container'>
             <div className={'end-point-element end-point-element-'+ cell.color}>
             </div>
             {cell.pipe !== null && 
             <EndPipeComponent 
                pipe={cell.pipe} 
                isStart={cell.isStart}>
             </EndPipeComponent>}
        </div>
    )
}