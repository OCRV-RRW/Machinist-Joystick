import React, { useEffect, useRef, useState } from 'react';
import './Game.css'
import minigameData from '../../miniGame.json'
import { GridComponent } from './GridComponent';
import { Grid } from './models/Grid';

export function PipeGame({ socket, id, returnToJoystick }) {
    const levels = minigameData.levels
    const minLevelNumber = 0
    const maxLevelNumber = levels.length
    const currentLevel = useRef({})
    const [grid, setGrid] = useState(new Grid())

    useEffect(() => {
        currentLevel.current = minigameData.levels[Math.floor(Math.random() * (maxLevelNumber - minLevelNumber)) + minLevelNumber]
        const copyGrid = new Grid()
        currentLevel.current.map((cell) => {
            copyGrid.addCell(cell.i, cell.j, cell.isEndPoint, cell.endPointColor)
        })
        setGrid(copyGrid)
    }, [])

    const restart = (e) => {
        let copyGrid = new Grid()
        copyGrid.cells = grid.cells
        copyGrid.clear()
        setGrid(copyGrid)
    }

    return (
        <>
        <div className='container'>
            <div className='buttons-container'>
                <button className='game-button return-to-joystick' onClick={() => {returnToJoystick()}}></button>
                <button className='game-button restart-button' onClick={() => {restart()}}></button>
            </div>
            <GridComponent grid={grid} setGrid={setGrid}></GridComponent>
        </div>
        </>
    )
}