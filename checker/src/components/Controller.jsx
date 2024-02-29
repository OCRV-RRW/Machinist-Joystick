import { useState, useEffect, useCallback } from 'react';
import './Controller.css'
export function Controller({setRequest, socket})
{
    const moveEvent = {"Key":null,"State":null,"Role":"Assistant","Type":"InputEvent","ForServer":false}
    const [currentKey, setKey] = useState('')
    const [shiftState, setShiftState] = useState(false)
    const [interact, setInteract] = useState(false)
    const [moveBlock, setMoveBlock] = useState(true)

    const A = 'A'
    const D = 'D'
    const W = 'W'
    const Shift = 'LeftShift'
    const Up = 'Up'
    const Down = 'Down'

    const moveBlockRange = 15; 
    
    function setBaseState(target)
    {
        target.value = 0
        ShiftUp()
        setCurrentKey('')
        setMoveBlock(true)
    }

    function sendEvent(key, code) {
      let event = {...moveEvent}
      event['Key'] = key
      event['State'] = code
      socket.send(JSON.stringify({...event})) //TODO
    }
    
    function ShiftDown() {
      if(shiftState) return;
      setShiftState(true)
      sendEvent(Shift,Down)
    }
    
    function ShiftUp() {
      if(!shiftState) return;
      setShiftState(false)
      sendEvent(Shift,Up)
    }
    
    function setCurrentKey(key) {
        if (key === currentKey) return;
        if (currentKey !== '')
            sendEvent(currentKey, Up)
        setKey(key)
        if (key !== '')
            //setTimeout(() => sendEvent(key, Down), (timeOut))
            sendEvent(key, Down)
    }

    function handleMoveBlock(sliderValue)
    {
        if(Math.abs(sliderValue) > moveBlockRange)
            setMoveBlock(false)
    }
    
    function handleInputChange(e) {
        const val = e.target.value

        handleMoveBlock(val)
        if (moveBlock) return; 
        //if (Math.abs(sliderValue) <= interactRange) return;
        if (val > 0 &&  val <= 100)
           setCurrentKey(D)
        else if (val < 0 && val >= -100)
          setCurrentKey(A)
        if((val >= -100 && val <= -50) || (val <= 100 && val >= 50))
            ShiftDown()
        else ShiftUp()
    }

    function handleOnPointerDown() {
        setInteract(true)
    }

    function handleOnPointerUp(e) {
        if(interact && moveBlock)
        {
            console.log("interact")
            sendEvent(W, Down)
            sendEvent(W, Up)
        }
        console.log("up")
        setBaseState(e.target)
    }

    function handleOnPointerMove() {
        //setInteract(false)
    }

    function handleOnPointerOut(e)
    {
        console.log('out')
        setBaseState(e.target)
    }

    return (<>
        <div className="joystick">
            <div className="controller-container">
                <input id="controller"type="range" min="-100" max="100" defaultValue="0"
                onTouchStart={handleOnPointerDown} onTouchEnd={handleOnPointerUp} 
                onTouchMove={handleOnPointerMove}
                onMouseDown={handleOnPointerDown} onMouseUp={handleOnPointerUp}
                onMouseMove={handleOnPointerMove} onMouseOut={handleOnPointerOut}

                onInput={handleInputChange}></input>
            </div>
        </div>
    </>)
} 