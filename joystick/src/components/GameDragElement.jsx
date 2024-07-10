import { useRef } from 'react'
import './GameDragElement.css'
import { ReactComponent as PipeCurve } from '../images/curvePipe.svg'
import { ReactComponent as PipeLine } from '../images/linePipe.svg'
import { ReactComponent as PipeEnd } from '../images/endPipe.svg'

export default function GameDragElement({color, directions, isEndPoint, isStart}) {
    const ref = useRef(null)
    const typeLine = useRef('')
    const currentVector = useRef([])
    const colorDict = {
        "red": "#C0392B", 
        "blue": "#2980B9",
        "green": "#27AE60",
        "pink": "#2C3E50",
        "yellow": "#F39C12"
    }

    if (directions.length === 2) {
        if (directions[0] === directions[1]) {
            currentVector.current = directions[0]
        }
        else {
            let vectorSum = calculateVectorSum(directions[0], directions[1])
            let determinant = calculateDeterminant(directions[0], directions[1])
            currentVector.current = [vectorSum[0] * determinant, vectorSum[1] * determinant]
        }
    }
    else if (directions.length === 1) {
        currentVector.current = directions[0]
    }
    updateView(currentVector.current)

    function updateView(currentVector) {
        if (isEndPoint && isStart != null) {
            typeLine.current = 'drag-element-end'
            if (currentVector[0] === 1 && isStart === true) {
                ref.current.style.transform = "rotate(270deg)"
            }
            else if (currentVector[0] === 1 && isStart === false) {
                ref.current.style.transform = "rotate(90deg)"
            }
            else if (currentVector[0] === -1 && isStart === true) {
                ref.current.style.transform = "rotate(90deg)"
            }
            else if (currentVector[0] === -1 && isStart === false) {
                ref.current.style.transform = "rotate(270deg)"
            }
            else if (currentVector[1] === 1 && isStart === true) {
                ref.current.style.transform = "rotate(180deg)"
            }
            else if (currentVector[1] === 1 && isStart === false) {
                ref.current.style.transform = "rotate(0deg)"
            }
            else if (currentVector[1] === -1 && isStart === true) {
                ref.current.style.transform = "rotate(0deg)"
            }
            else if (currentVector[1] === -1 && isStart === false) {
                ref.current.style.transform = "rotate(180deg)"
            }
        }
        else {
            if (currentVector[0] === 0 && currentVector[1] === 0) {
                typeLine.current = 'drag-element-line'
                return
            }
            else {
                if (currentVector[0] === 0 || currentVector[1] === 0){
                    typeLine.current = 'drag-element-line'
                    if (currentVector[1] === 0) {
                        ref.current.style.transform = "rotate(90deg)"
                    }
                    else if (currentVector[0] === 0) {
                        ref.current.style.transform = "rotate(0deg)"
                    }
                }
                else {
                    typeLine.current = 'drag-element-curve'
                    if (currentVector[0] === -1 && currentVector[1] === 1) {
                        ref.current.style.transform = "rotate(-90deg)"
                    }
                    else if (currentVector[0] === 1 && currentVector[1] === -1) {
                        ref.current.style.transform = "rotate(90deg)"
                    }
                    else if (currentVector[0] === -1 && currentVector[1] === -1) {
                        ref.current.style.transform = "rotate(180deg)"
                    }
                    else if (currentVector[0] === 1 && currentVector[1] === 1){
                        ref.current.style.transform = "rotate(0deg)"
                    }
                }
            }
        }
    }

    function calculateDeterminant(vector1, vector2) {
        return (vector1[0] * vector2[1]) - (vector2[0] * vector1[1])
    }

    function calculateVectorSum(vector1, vector2) {
        return [vector1[0] + vector2[0], vector1[1] + vector2[1]]
    } 

    return (
        <div ref={ref} className='drag-element'>
            {typeLine.current === 'drag-element-curve' && <PipeCurve fill={colorDict[color]}></PipeCurve>}
            {typeLine.current === 'drag-element-line' && <PipeLine fill={colorDict[color]}></PipeLine>}
            {typeLine.current === 'drag-element-end' && <PipeEnd fill={colorDict[color]}></PipeEnd>}
        </div>
    )
}