import "./GameDragElement.css"
import { colors } from './models/colors'
import { ReactComponent as PipeEnd } from '../../images/endPipe.svg'
import { useEffect, useRef } from "react"

export const EndPipeComponent = ({ pipe, isStart }) => {
    const ref = useRef(null)

    const setView = () => {
        if (isStart === false) {
            if (pipe.vector[0] === 1) 
                ref.current.style.transform = "rotate(90deg)"
            else if (pipe.vector[0] === -1)
                ref.current.style.transform = "rotate(270deg)"
            else if (pipe.vector[1] === 1)
                ref.current.style.transform = "rotate(0deg)"
            else if (pipe.vector[1] === -1)
                ref.current.style.transform = "rotate(180deg)"
        }
        else if (isStart === true) {
            if (pipe.vector[0] === 1) 
                ref.current.style.transform = "rotate(270deg)"
            else if (pipe.vector[0] === -1)
                ref.current.style.transform = "rotate(90deg)"
            else if (pipe.vector[1] === 1)
                ref.current.style.transform = "rotate(180deg)"
            else if (pipe.vector[1] === -1)
                ref.current.style.transform = "rotate(0deg)"
        }
    }

    useEffect(() => {
        setView()
    })

    return (
        <div ref={ref}
            className="drag-element">
            <PipeEnd fill={colors[pipe.color]}></PipeEnd>
        </div>
    )
}