import "./GameDragElement.css"
import { colors } from './models/colors'
import { ReactComponent as PipeCurve } from '../../images/curvePipe.svg'
import { ReactComponent as PipeLine } from '../../images/linePipe.svg'
import { useEffect, useRef } from "react"

export const PipeComponent = ({ pipe }) => {
    const ref = useRef(null)

    const setView = () => {
        if (ref.current === null)
            return

        if (pipe.type === 'line') {
            if (pipe.vector[1] === 0)
                ref.current.style.transform = "rotate(90deg)"
            else if (pipe.vector[0] === 0)
                ref.current.style.transform = "rotate(0deg)"
        }
        else if (pipe.type === 'curve') {
            if (pipe.vector[0] === -1 && pipe.vector[1] === 1) 
                ref.current.style.transform = "rotate(-90deg)"
            else if (pipe.vector[0] === 1 && pipe.vector[1] === -1)
                ref.current.style.transform = "rotate(90deg)"
            else if (pipe.vector[0] === -1 && pipe.vector[1] === -1)
                ref.current.style.transform = "rotate(180deg)"
            else if (pipe.vector[0] === 1 && pipe.vector[1] === 1) 
                ref.current.style.transform = "rotate(0deg)"
        }
    }

    useEffect(() => {
        setView()
    })

    return (
        <div ref={ref}
            className="drag-element">
            {pipe.type === 'line' && <PipeLine fill={colors[pipe.color]}></PipeLine>}
            {pipe.type === 'curve' && <PipeCurve fill={colors[pipe.color]}></PipeCurve>}
        </div>
    )
}