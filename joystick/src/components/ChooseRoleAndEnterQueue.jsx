import { useEffect } from "react"
import "./ChooseRoleAndEnterQueue.css"

export function ChooseRoleAndEnterQueue({socket, onEnterQueue, onEnterGame})
{
    const roleEvent = {"Role": "Assistant","ForServer":true,"Type":"EnterQueueRequest"}


    function handleEnterQueueResponse(e)
    {
        var dir = JSON.parse([e])
        // if (dir["Type"] === "EnterQueueResponse") //TODO:
        if (dir["Type"] === "LetJoystickIntoGame") onEnterGame()
        if (dir["Type"] === "UpdateSpotInLine")  onEnterQueue(dir["SpotInLine"])
    }

    function onChooseMachinist()
    {
        ChooseRole("Machinist")
    }

    function onChooseAssistant()
    {
        ChooseRole("Assistant")
    }

    useEffect(() => {
        socket.addEventListener("message", (event) => {handleEnterQueueResponse(event.data)});
        return () => {
          socket.removeEventListener("message", (event) => {handleEnterQueueResponse(event.data)});
        };
    })

    function ChooseRole(role)
    {
        let event = {...roleEvent}
        event["Role"] = role
        socket.send(JSON.stringify(event))
    }

    return (
        <>
        <p id='choose-role-title'>Выберите роль</p> 
        <div id='choose-role-container'>
            <button id='machinist-button' className='default-button' onClick={onChooseMachinist}>Машинист</button>
            <button id='assistant-button' className='default-button' onClick={onChooseAssistant}>Ассистент</button>
        </div>
        </>
    );
}