import { useState, useEffect } from 'react';
import { SmartModeSwitching } from './SmartModeSwitching';


export function TrainCrane({ startCraneValue, onUpdateCraneMode }) {
    const [crane, setCrane] = useState(Number(startCraneValue));
    const min = 0;
    const max = 2;

    useEffect(() => {
        onUpdateCraneMode(crane);
        var inputRange = document.getElementById("driver-crane");
        console.log("crane" + crane);
        inputRange.value = crane;
        var slider = document.querySelector('[data="test"]');
        if (crane === 0)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb { transform : rotate(30deg); }";
        if (crane === 1)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(0deg); }";
        if (crane === 2)
            slider.innerHTML = "#driver-crane::-webkit-slider-thumb {  transform : rotate(-30deg); }";
    }, [crane]);


    function handleUpdateMode(updateMode) {
        updateMode *= -1;
        let newMode = crane + updateMode;
        console.log("handleUpdateMode " + updateMode)
        if (newMode > max)
            setCrane(max);
        else if (newMode < min)
            setCrane(min);

        else
            setCrane(newMode);
    }

    return (
        <>
            <div id="crane-move-area" className="driver-control-el-container">
                <div id="driver-crane-panel">
                    <input
                        readOnly
                        id="driver-crane"
                        type="range"
                        min={min} max={max} defaultValue={startCraneValue} />
                </div>
            </div>

            <SmartModeSwitching
                scaleTargetId={"driver-crane-panel"}
                positionTargetId={"crane-move-area"}
                modeAmount={max + 1}
                onUpdateMode={handleUpdateMode} />
            <style data="test" type="text/css"></style>
        </>
    );
}
