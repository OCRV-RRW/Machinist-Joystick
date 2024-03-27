import { useState } from "react";

export function ChooseRoom({onJoin, socket})
{
    const [errorMessage, setErrorMessage] = useState()

    const joinRoom = {"RoomName": "","ForServer":true, "Type":"JoinRoomRequest"}

    function handleRoomResponse(response)
    {
        var dir = JSON.parse([response]);
        if (dir["Type"] !== "JoinRoomResponse") return;

        if (dir["IsSuchRoom"] === false)
        {
            setErrorMessage(<div>Такой комнаты не существует</div>)
        }
        if (dir["IsSuchRoom"] === true)
        {
            onJoin()
        }
    }

    function handleJoinRoom() {

        let roomName = document.getElementById("roomName").value
        socket.onopen = () => {console.log("open")}
        socket.addEventListener("message", (event) => {handleRoomResponse(event.data)});
        let event = {...joinRoom}
        event["RoomName"] = roomName
        console.log(event)
        console.log(socket.OPEN)
        socket.send(JSON.stringify(event))
    }
      
    return (
        <>
            <label>
                Название комнаты: <input id="roomName" type="text"/>
            </label>
            {errorMessage}
            <button onClick={handleJoinRoom}>Выбрать</button>
        </>
    );
}