import { useState, useEffect } from 'react'
import './TrainControlPanel.css'

//https://www.notion.so/sergsamsonov/3daa131736af46c4bc285434fa9b1c9c
const rangeToController = {
    0: 3,
    1: 2,
    2: 1,
    3: 0,
    4: 4
}

export function TrainControlPanel({socket, craneDefault, controllerDefault, onExit})
{
    const trainMovementEvent = {"Crane":0,"Controller":0,"Role":null,"Type":"TrainMovement","ForServer":false}

    const [controller, setController] = useState(getDefaultController())
    const [crane, setCrane] = useState(craneDefault)

    function handleDriverController(e) {
        let value = e.target.value
        console.log("driver-controller: " + value)
        setController(Number(value))
    }

    function handleDriverCrane(e) {
        let value = e.target.value
        console.log("driver-crane: " + value)
        setCrane(Number(value))
    }

    useEffect(()=>{
        var slider = document.querySelector('[data="test"]')
        if (crane === 0)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb { transform : rotate(30deg); }"
        if (crane === 1)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(0deg); }"
        if (crane === 2)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(-30deg); }"
    }, [crane])

    useEffect(()=>{
        trainMovementEvent["Controller"] = rangeToController[controller]
        console.log("controller: " + controller + ", value: " + rangeToController[controller])
        trainMovementEvent["Crane"] = crane
        socket.send(JSON.stringify(trainMovementEvent))
    }, [controller, crane])


    function getDefaultController()
    {
        for (const [key, value] of Object.entries(rangeToController)) {
            if(value === controllerDefault)
                return key
        }
        return 0
    }

    return (
        <>
        <button id="return-to-joystick" className="default-button" onClick={() => onExit()}></button>
        <div id="controllers-container" className='unselect'>
            <div id="driver-controller-panel">
                <input 
                    id="driver-controller"
                    type="range" 
                    min="0" max="4" defaultValue={getDefaultController()}
                    onInput={handleDriverController}/>
            </div>
            <div id="driver-crane-panel">
                <input
                    id="driver-crane"
                    type="range"
                    min="0" max="2" defaultValue={craneDefault}
                    onInput={handleDriverCrane}/>
            </div>
        </div>
        <style data="test" type="text/css"></style>
        </>
    );
}