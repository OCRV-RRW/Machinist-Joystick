import { useState, useEffect } from 'react';
import { SmartModeSwitching } from './SmartModeSwitching';


//https://www.notion.so/sergsamsonov/3daa131736af46c4bc285434fa9b1c9c
export const rangeToController = {
    0: 3,
    1: 2,
    2: 1,
    3: 0,
    4: 4
}

export function TrainController({ onUpdateControllerMode, startControllerValue }) {
    const [controller, setController] = useState(getDefaultController());
    const max = 4;
    const min = 0;

    useEffect(() => {
        onUpdateControllerMode(rangeToController[controller]);
        var inputRange = document.getElementById("driver-controller");
        console.log("controller " + controller + " type: " + typeof (controller));
        inputRange.value = controller;
    }, [controller]);

    function getDefaultController() {
        for (const [key, value] of Object.entries(rangeToController))
            if (value === startControllerValue)
                return Number(key);

        return 0;
    }

    function handleDriverController(updateMode) {
        console.log("handleDriverController " + updateMode)
        updateMode *= -1;
        let newMode = controller + updateMode;
        if (newMode > max)
            setController(max);
        else if (newMode < min)
            setController(min);
        else
            setController(newMode);
    }

    return (
        <>
            <div id="controller-move-area" className="driver-control-el-container">
                <div id="driver-controller-panel">
                    <input
                        id="driver-controller"
                        type="range"
                        min={min} max={max} defaultValue={getDefaultController()} />
                </div>
            </div>
            <SmartModeSwitching
                scaleTargetId={"driver-controller-panel"}
                positionTargetId={"controller-move-area"}
                modeAmount={max + 1}
                onUpdateMode={handleDriverController} />
        </>
    );
}
