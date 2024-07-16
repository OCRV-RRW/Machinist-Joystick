import { useState, useEffect, useCallback } from 'react';
import { MovementJoystick } from './MovementJoystick';
import { TrainControlPanel } from './TrainControlPanel';
import { Game } from './pipeGame/Game';

export function Joystick({socket, navigate})
{
    const [state, setState] = useState(<MovementJoystick socket={socket}/>)
    
    const handleSocketEvent = useCallback( (data) => {
        console.log(data)
        var dir = JSON.parse([data]);
        if (dir["Type"] === "OpenTrainControlPanel")
           setState(<TrainControlPanel socket={socket}
            craneDefault={dir["Crane"]}
            controllerDefault={dir["Controller"]}
            onExit={setJoystick}/>)
        if (dir["Type"] === "StartPipeGame") {
            setState(<Game socket={socket} 
                id={dir["Id"]} 
                onExit={setJoystick}>
                </Game>)
        }
    })

    function setJoystick()
    {
        setState(<MovementJoystick socket={socket}/>)
    }

    useEffect(() => {
        socket.addEventListener("message", (event) => {handleSocketEvent(event.data)});
        return () => {
            socket.removeEventListener("message", (event) => {handleSocketEvent(event.data)});
        };
    })

    return (state);
}