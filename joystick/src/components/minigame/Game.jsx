import React, { useEffect, useRef, useState } from 'react';
import './Game.css'
import { GameGridElement } from './GameGridElement';
import minigameData from '../../miniGame.json'

export function Game({ socket, id, onExit }) {
    const levels = minigameData.levels
    const elements = []
    const minLevelNumber = 0
    const maxLevelNumber = levels.length
    const elementsRefs = useRef([])
    const currentColor = useRef()
    const numberLevel = useRef(Math.floor(Math.random() * (maxLevelNumber - minLevelNumber)) + minLevelNumber)

    const [elementsPath, setElementsPath] = useState([[]])
    const [isDragProcess, setIsDragProcess] = useState(false)
    const [currentEl, setCurrentEl] = useState(null)
    const [prevEl, setPrevEl] = useState(null)

    const repairEvent = {"Id": id, "Role":null, "Type":"RepairFuse", "ForServer":false}

    const elementOnEnter = (element) => {
        setCurrentEl(element)
    }

    const elementOnLeave = (element) => {
       setPrevEl(element)
    }


    function restart() {
        for (let elementsPaths of elementsPath) {
            for (let element of elementsPaths) {
                element.clear()
            }
        }
        setElementsPath([[]])
    }

    useEffect(() => {
        if (currentEl && prevEl) {
            changeDirection(currentEl, prevEl)
            if (currentEl.getColor() !== prevEl.getColor()) {
                removePath(prevEl)
            }

            if (currentEl && prevEl && (Math.abs(currentEl.getCoordinate().i - prevEl.getCoordinate().i) + 
            Math.abs(currentEl.getCoordinate().j - prevEl.getCoordinate().j) >= 2)) {
                removePath(currentEl)
            }

            if (currentEl && currentEl.getIsDeletedPrev() === true) {
                let i = -1
                elementsPath[elementsPath.length - 1].forEach(element => {
                    i++;
                    if (element === currentEl) {
                        let elsPathDeleted = elementsPath[elementsPath.length - 1].slice(i + 1)
                        for (let element of elsPathDeleted) {
                            if (element.getIsEndPoint() === true && element.getColorEndPoint() === currentColor) {
                                removePath(element)
                                return
                            }
                            onRemovedElement(element)
                        }
                        return
                    }
                });
            }
                
        }
    }, [currentEl])

    function changeDirection(current, prev) {
        current.changeDirection({x: current.getCoordinate().j - prev.getCoordinate().j, 
            y: prev.getCoordinate().i - current.getCoordinate().i})

        prev.changeDirection({x: current.getCoordinate().j - prev.getCoordinate().j, 
            y: prev.getCoordinate().i - current.getCoordinate().i})
    }

    function removePath(element) {
        let index = -1;
        for (let i = 0; i < elementsPath.length; i++) {
            if (elementsPath[i].find((el) => el === element)) {
                index = i
                break;
            }
        }
        if (index >= 0) {
            elementsPath[index].forEach(element => {
                element.clear()
            });
            setElementsPath([...elementsPath.slice(0, index), ...elementsPath.slice(index + 1)])
            setIsDragProcess(false)
        }
    }

    function validatePath(element) {
        for (let elementPath of elementsPath) {
            if (elementPath.find((el) => el === element)){
                let countEndPoints = 0
                let lastCoordinate = {i: null, j: null}
                for (element of elementPath) {
                    if (element.getIsEndPoint() === true && element.getColor() === currentColor.current) {
                        countEndPoints++
                    }
                    if (lastCoordinate.i !== null && lastCoordinate.j !== null) {
                        if (Math.abs(element.getCoordinate().i - lastCoordinate.i) + 
                        Math.abs(element.getCoordinate().j - lastCoordinate.j) >= 2) {
                            return false
                    }
                    }
                    lastCoordinate = {i: element.getCoordinate().i, j: element.getCoordinate().j}
                }

                if (countEndPoints !== 2)
                    return false
                else
                    return true
            }
        }

        return false
    }

    function onAddElement(element, color=null) {
        elementsPath[elementsPath.length - 1].push(element)
        setElementsPath(elementsPath)
        if (color != null) {
            currentColor.current = color
        }
        element.setColor(currentColor.current)
    }

    function onRemovedElement(element) {
        let index = null
        for (let i = 0; i , elementsPath[elementsPath.length - 1].length; i++) {
            if (elementsPath[elementsPath.length - 1][i] === element) {
                index = i;
                break
            }
        }

        if (index !== null) {
            elementsPath[elementsPath.length - 1].splice(index, 1)
            setElementsPath(elementsPath)
        }
        element.clear()
    }
    
    levels[numberLevel.current].map((elementData, idx) => {
        elements.push(<GameGridElement key={elementData.id}
            ref={el => elementsRefs.current[idx] = el}
            isEndPoint={elementData.isEndPoint} 
            i={elementData.i} 
            j={elementData.j}
            isDragProcess={isDragProcess} 
            setDragProcess={(val) => setIsDragProcess(val)}
            unsetDragProcess={() => setIsDragProcess(false)}
            onAddedElementsToCurrentPath={onAddElement}
            onRemovedElementFromCurrentPath={(element) => onRemovedElement(element)}
            onStartPath={() => {elementsPath.push([]); setElementsPath(elementsPath)}}
            onRemovedPath={(element) => removePath(element)}
            currentColor={currentColor}
            endPointColor={elementData.endPointColor}
            validatePath={(element) => validatePath(element)}
            onEnter={(element) => elementOnEnter(element)}
            onLeave={(element) => elementOnLeave(element)}/>)
    })

    function onTouchStart(event) {
        elementsRefs.current.map(elRef => {
            if (elRef.checkPos({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY })) {
                elRef.onDown()
            }
        });
    }

    function onTouchEnd(event) {
        elementsRefs.current.map(elRef => {
            if (elRef.checkPos({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY })) {
                elRef.onUp()
            }
        });

        checkStateGame()
    }

    function onTouchMove(event) {
        elementsRefs.current.map(elRef => {
            if (elRef.checkPos({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY })) {
                if (elRef.state.entered === false) {
                    elRef.onEnter()
                }
            }
            else {
                if (elRef.state.entered === true) {
                    elRef.onLeave()
                }
            }
        });
    }

    function checkStateGame() {
        elementsRefs.current.map(elRef => {
            if (elRef.state.isBusy === false)
                return
        })

        socket.send(JSON.stringify(repairEvent))
        onExit()
    }

    return (
        <>
        <div className='container'>
            <div className='game-grid'
                onTouchStart={onTouchStart} 
                onTouchEnd={onTouchEnd}
                onTouchMove={onTouchMove}>
                    {elements}
            </div>
            <div className='buttons-container'>
                <button className='game-button return-to-joystick' onClick={() => onExit()}></button>
                <button className='game-button restart-button' onClick={() => {restart()}}></button>
            </div>
        </div>
        </>
    )
}