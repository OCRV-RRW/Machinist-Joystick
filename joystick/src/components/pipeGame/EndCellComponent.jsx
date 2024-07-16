import { useRef, useState } from 'react' 
import './GameEndPointElement.css'
import { EndPipeComponent } from './EndPipeComponent'

export const EndCellComponent = ({ 
    cell, 
    onStart
}) => {
    const ref = useRef(null)
    const [pipe, setPipe] = useState(null)

    const pointerDownHandler = (e) => {
        if (cell.path !== null)
            return

        cell.tryAddPipe(cell.color)
        setPipe(cell.pipe)
        onStart(cell)
        cell.setIsStart(true)
    }

    return (
        <div ref={ref} 
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