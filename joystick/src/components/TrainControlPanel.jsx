import { useState, useEffect } from 'react'
import './TrainControlPanel.css'

export function TrainControlPanel({socket, navigate})
{
    const trainMovementEvent = {"Crane":0,"Controller":0,"Role":null,"Type":"TrainMovement","ForServer":false}

    const [controller, setController] = useState(2)
    const [crane, setCrane] = useState(1)

    //https://www.notion.so/sergsamsonov/3daa131736af46c4bc285434fa9b1c9c
    const rangeToController = {
        0: 3,
        1: 2,
        2: 1,
        3: 0,
        4: 4
    }

    function handleDriverController(e) {
        let value = e.target.value
        console.log("driver-controller: " + value)
        setController(value)
    }

    function handleDriverCrane(e) {
        let value = e.target.value
        console.log("driver-crane: " + value)
        setCrane(value)
    }

    useEffect(()=>{
        var slider = document.querySelector('[data="test"]')

        if (crane === '0')
        slider.innerHTML = "#driver-crane::-webkit-slider-thumb { transform : rotate(30deg); }"
        if (crane === '1')
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(0deg); }"
        if (crane === '2')
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(-30deg); }"
    }
, [crane])

    useEffect(()=>{
        // trainMovementEvent["Controller"] = rangeToController[controller]
        // trainMovementEvent["Crane"] = crane
        // socket.send(JSON.stringify(trainMovementEvent))
    }, [controller, crane])

    return (
        <>
        <button id="return-to-joystick" className="default-button" onClick={() => navigate('/joystick')}></button>
        <div id="controllers-container" className='unselect'>
            <div id="driver-controller-panel">
                <input 
                    id="driver-controller"
                    type="range" 
                    min="0" max="4" defaultValue="2"
                    onInput={handleDriverController}/>
            </div>
            <div id="driver-crane-panel">
                <input
                    id="driver-crane"
                    type="range"
                    min="0" max="2" defaultValue="1"
                    onInput={handleDriverCrane}/>
            </div>
        </div>
        <style data="test" type="text/css"></style>
        </>
    );
}