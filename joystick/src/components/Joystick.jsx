import { useState, useEffect, useCallback } from 'react';
import './Joystick.css'

const movementEvent = {"Right":false,"Left":false,"Interact":false,"Role":null,"Type":"MovementEvent","ForServer":false}
const openTrainControlPanelEvent = {"Role":null,"Type":"OpenTrainControlPanel","ForServer":false}

export function Joystick({socket, navigate})
{
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)


    const handleSocketEvent = useCallback( (data) => {
        console.log(data)
        var dir = JSON.parse([data]);
        if (dir["Type"] !== "OpenTrainControlPanel") return;
        navigate('/trainControlPanel')
      })

    useEffect(() =>
    {
        let event = getMovementEvent()
        socket.send(JSON.stringify(event))
        console.log(event)
    }, [left, right])

    useEffect(() => {
        socket.addEventListener("message", (event) => {handleSocketEvent(event.data)});
        return () => {
          socket.removeEventListener("message", (event) => {handleSocketEvent(event.data)});
        };
    })

    function getMovementEvent(){
        let event = {...movementEvent}
        event["Left"] = left
        event["Right"] = right
        event["Interact"] = false
        return event
    }

    const downLeft = () => setLeft(true)

    const upLeft = () => setLeft(false)

    const downRight = () => setRight(true)

    const upRight = () => setRight(false)

    function handleInteractClick()
    {
        let event = getMovementEvent()
        event["Interact"] = true
        socket.send(JSON.stringify(event))
        event["Interact"] = false
        socket.send(JSON.stringify(event))
    }

   return(
    <>
    <button id="left"
        onTouchStart={downLeft} onTouchEnd={upLeft}
        onMouseDown={downLeft} onMouseUp={upLeft} onMouseOut={upLeft}
    ></button>
    <button id="right"
        onTouchStart={downRight} onTouchEnd={upRight} 
        onMouseDown={downRight} onMouseUp={upRight} onMouseOut={upRight}
    ></button>
    <button id="interact"
        onClick={handleInteractClick}
    ></button>
    </>
   );
}