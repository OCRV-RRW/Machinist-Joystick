import { useState, useEffect, useCallback } from 'react';
import './Joystick.css'

const movementEvent = {"Right":false,"Left":false,"Interact":false,"Role":null,"Type":"MovementEvent","ForServer":false}

export function Joystick({socket, navigate})
{
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [interact, setInteract] = useState(false)


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
    }, [left, right, interact])

    useEffect(() => {
        socket.addEventListener("message", (event) => {handleSocketEvent(event.data)});
        return () => {
          socket.removeEventListener("message", (event) => {handleSocketEvent(event.data)});
        };
    })

    const getMovementEvent = useCallback(() =>
    {
        let event = {...movementEvent}
        event["Left"] = left
        event["Right"] = right
        event["Interact"] = interact
        return event
    }, [left, right, interact]
    )

    const downLeft = () => setLeft(true)

    const upLeft = () => setLeft(false)

    const downRight = () => setRight(true)

    const upRight = () => setRight(false)

    const upInteract = () => setInteract(false)

    const downInteract = () => setInteract(true)

   return(
    <div id="move-button-container">
        <button id="left" className="default-button"
            onTouchStart={downLeft} onTouchEnd={upLeft}
            onMouseDown={downLeft} onMouseUp={upLeft} onMouseOut={upLeft}
        ></button>
        <button id="right" className="default-button"
            onTouchStart={downRight} onTouchEnd={upRight} 
            onMouseDown={downRight} onMouseUp={upRight} onMouseOut={upRight}
        ></button>
        <button id="interact" className="default-button"
            onTouchStart={downInteract} onTouchEnd={upInteract} 
            onMouseDown={downInteract} onMouseUp={upInteract} onMouseOut={upInteract}
        ></button>
    </div>
   );
}