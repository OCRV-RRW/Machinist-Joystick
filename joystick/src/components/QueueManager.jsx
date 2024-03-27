import { useEffect, useState } from "react"
import { Queue } from "./Queue"

export function QueueManager({socket, onEnterGame})
{
    const [spotInLine, seSpotInLine] = useState("-")

    function handleQueueEvent(e)
    {
        var dir = JSON.parse([e.data]);
        if (dir["Type"] === "UpdateSpotInLine") seSpotInLine(dir["SpotInLine"]);
        if (dir["Type"] === "LetJoystickIntoGame") onEnterGame();
    }

    useEffect(() => {
        socket.addEventListener("message", (e)=>handleQueueEvent(e))
    })

    return (<Queue spotInLine={spotInLine}/>)
}