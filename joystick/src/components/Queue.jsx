import { useEffect, useState } from "react"
import "./Queue.css"

export function Queue({socket, onEnterGame, chooseRole, startSpotInLine})
{
    const leaveQueueEvent = {"ForServer":true,"Type":"LeaveQueue"}
    const [spotInLine, seSpotInLine] = useState(startSpotInLine)

    function handleQueueEvent(e)
    {
        var dir = JSON.parse([e.data]);
        if (dir["Type"] === "UpdateSpotInLine") seSpotInLine(dir["SpotInLine"]);
        if (dir["Type"] === "LetJoystickIntoGame") onEnterGame();
    }

    function LeaveQueue()
    {
        socket.send(JSON.stringify(leaveQueueEvent))
        chooseRole()
    }

    useEffect(() => {
        console.log("start handle queue events")
        socket.addEventListener("message", (e)=>handleQueueEvent(e))
    })

    return (
        <>
        <div id="header-queue">Oчередь</div>
        <div id="leave-container">
            <button className="default-button" onClick={LeaveQueue}>
                выйти
            </button>
        </div>
        <div className="spot-in-line-container">
        <p>
            Место в очереди:
        </p>
        <p id="spot-in-line">{spotInLine}</p>
        </div>
        </>
    )
}