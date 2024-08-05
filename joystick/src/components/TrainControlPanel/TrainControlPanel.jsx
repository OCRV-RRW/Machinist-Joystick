import { useState, useEffect } from 'react'
import './TrainControlPanel.css'
import { TrainController } from './TrainController'
import { TrainCrane } from './TrainCrane'

export function TrainControlPanel({socket, craneDefault, controllerDefault, onExit})
{
    const trainMovementEvent = {"Crane":0,"Controller":0,"Role":null,"Type":"TrainMovement","ForServer":false}

    const [controller, setController] = useState()
    const [crane, setCrane] = useState(craneDefault)

    useEffect(()=>{
        trainMovementEvent["Controller"] = controller
        trainMovementEvent["Crane"] = crane

        socket.send(JSON.stringify(trainMovementEvent))
    }, [controller, crane])


    return (
        <>
        <div className='train-control-panel-layout'>
            <TrainController onUpdateControllerMode={setController} startControllerValue={controllerDefault}/> 
            <div className='driver-empty-center'>
                <button id="return-to-joystick" className="default-button" onClick={() => onExit()}></button>
            </div>
            <TrainCrane onUpdateCraneMode={setCrane} startCraneValue={craneDefault}/>
        </div>
        </>
    );
}