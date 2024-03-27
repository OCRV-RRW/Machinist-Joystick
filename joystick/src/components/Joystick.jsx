import { useState, useEffect } from 'react';

const movementEvent = {"Right":false,"Left":false,"Interact":false,"Role":null,"Type":"MovementEvent","ForServer":false}


export function Joystick({socket})
{
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)

    useEffect(() =>
    {
        let event = getMovementEvent()
        socket.send(JSON.stringify(event))
        console.log(event)
    }, [left, right])

    function getMovementEvent(){
        let event = {...movementEvent}
        event["Left"] = left
        event["Right"] = right
        event["Interact"] = false
        return event
    }

    function downLeft() {setLeft(true);}

    function upLeft() {setLeft(false);}

    function downRight() {setRight(true); }

    function upRight() {setRight(false);}

    function handleInteractClick()
    {
        console.log('interact')
        let event = getMovementEvent()
        event["Interact"] = true
        socket.send(JSON.stringify(event))
        event["Interact"] = false
        socket.send(JSON.stringify(event))
    }

   return(
    <>
    <button 
        onTouchStart={downLeft} onTouchEnd={upLeft}
        onMouseDown={downLeft} onMouseUp={upLeft} onMouseOut={upLeft}
    >Left</button>
    <button  
        onTouchStart={downRight} onTouchEnd={upRight} 
        onMouseDown={downRight} onMouseUp={upRight} onMouseOut={upRight}
    >Right</button>
    <button
        onClick={handleInteractClick}
    >Interact</button>
    </>
   );
}