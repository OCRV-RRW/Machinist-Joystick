import { useState, useEffect, useCallback } from 'react';


export function SmartModeSwitching({ scaleTargetId, positionTargetId, modeAmount, onUpdateMode }) {
    const [touchState, setTouchState] = useState({
        touchStartYPosition: 0,
        isDragging: false,
    });

    const [targetHeight, setTargetHeight] = useState(0);
    const [modeDistances, setModeDistances] = useState([]);
    const [currentMode, setCurrentMode] = useState(0);

    const handleTouchStart = useCallback(event => {
        setTouchState(prevState => ({ ...prevState, isDragging: true }));
    }, []);

    useEffect(() => {
        var modeDistances = [];
        for (var i = 1; i < modeAmount + 1; i++) {
            let distance = targetHeight * i / modeAmount;
            modeDistances.push(distance);
        }
        setModeDistances(modeDistances);
        console.log("modeDistances" + modeDistances);
    }, [targetHeight]);

    useEffect(() => {
        let height = document.getElementById(scaleTargetId).clientHeight;
        setTargetHeight(height);
        var area = document.getElementById(positionTargetId);
        area.addEventListener("touchstart", handleTouchStart, false);
    }, []);

    function getMode(distance) {
        distance = Math.abs(distance);
        for (var i = 0; i < modeDistances.length + 1; i++) {
            if (distance < modeDistances[i])
                return i + 1;
        }
        return modeDistances.length;
    }

    const handleTouchMove = useCallback(
        event => {
            var touch =  event.targetTouches[0].clientY
            console.log(
                "touchStartPosition: " + touchState.touchStartYPosition,
                touch
            );
            if (touchState.isDragging === true && touch) {
                if (!touchState.touchStartYPosition) {
                    console.log("invalid touch");
                    setTouchState(prevTouchState => ({
                        ...prevTouchState,
                        touchStartYPosition: touch
                    }));
                } else {
                    var mode = 0;
                    let distance = touchState.touchStartYPosition - touch;
                    if (touch > touchState.touchStartYPosition) 
                        mode = -1 * getMode(distance);
                    else 
                        mode = getMode(distance);

                    if (currentMode !== mode && touchState.touchStartYPosition !== 0) {
                        var diff = mode - currentMode;
                        if ((mode === 1 && currentMode === -1) || (mode === -1 && currentMode === 1))
                            diff /= 2; // between -1 and 1 range is 2 but if ignore 0 then we get 1
                        onUpdateMode(diff); // diff between new mode and currentMode (ignore zero)
                        setCurrentMode(mode);
                    }
                }
            }
        }, [touchState.isDragging, touchState.touchStartYPosition, currentMode]);

    const handleTouchEnd = useCallback(
        () => {
            if (touchState.isDragging) {
                setCurrentMode(0);
                setTouchState(prevState => ({
                    ...prevState,
                    isDragging: false,
                    touchStartYPosition: 0
                }));
            }
        }, [touchState.isDragging, touchState.touchStartYPosition]);

    useEffect(() => {
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
        return () => {
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleTouchMove, handleTouchEnd]);
}
