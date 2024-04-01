import { useState, useEffect } from 'react'
import './TrainJoystick.css'

export function TrainJoystick()
{
    const trainMovementEvent = {"controllerMode":0,"craneMode":1,"Role":null,"Type":"TrainMovementEvent","ForServer":false}
    const [controller, setController] = useState(2)
    const [crane, setCrane] = useState(1)

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
        trainMovementEvent["controllerMode"] = controller
        trainMovementEvent["craneMode"] = crane
        console.log(trainMovementEvent)
    }, [controller, crane])

    return (
        <>
        <div id="controllers-container">
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