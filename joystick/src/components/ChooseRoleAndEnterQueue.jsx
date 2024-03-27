export function ChooseRoleAndEnterQueue({socket, onEnterQueue, onEnterGame})
{
    const roleEvent = {"Role": "Assistant","ForServer":true,"Type":"EnterQueueRequest"}


    function handleEnterQueueResponse(e)
    {
        var dir = JSON.parse([e.data]);
        if (dir["Type"] === "EnterQueueResponse") onEnterQueue();
        if (dir["Type"] === "LetJoystickIntoGame") onEnterGame();
    }

    function onChooseMachinist()
    {
        ChooseRole("Machinist")
    }

    function onChooseAssistant()
    {
        ChooseRole("Assistant")
    }

    function ChooseRole(role)
    {
        let event = {...roleEvent}
        event["Role"] = role
        socket.send(JSON.stringify(event))

        socket.addEventListener("message", handleEnterQueueResponse)
    }

    return (
    <div>
        <button onClick={onChooseMachinist}>Машинист</button>
        <button onClick={onChooseAssistant}>Ассистент</button>
    </div>
    );
}