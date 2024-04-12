import { useState, useEffect } from "react";
import './ChooseRoom.css'

export function ChooseRoom({onJoin, socket})
{
    const [errorMessage, setErrorMessage] = useState()

    const joinRoom = {"RoomName": "","ForServer":true, "Type":"JoinRoomRequest"}
    
    function handleRoomResponse(response)
    {
        var dir = JSON.parse([response]);
        if (dir["Type"] !== "JoinRoomResponse") return;

        if (dir["IsSuchRoom"] === false)
            setErrorMessage(<p className="error">Комната с таким именем ещё не создана.</p>)
        if (dir["IsSuchRoom"] === true)
            onJoin()
    }
    
    useEffect(() => {
        socket.addEventListener("message", (event) => {handleRoomResponse(event.data)});
        return () => {
          socket.removeEventListener("message", (event) => {handleRoomResponse(event.data)});
        };
    })

    function handleJoinRoom() {
        let roomName = document.getElementById("roomName").value
        let event = {...joinRoom}
        event["RoomName"] = roomName
        socket.send(JSON.stringify(event))
    }
      
    return (
        <div className="choose-room-container">
            <p id="label">Название комнаты:</p>
            <input id="roomName" type="text"/>
            {errorMessage}
            <button className="default-button" onClick={handleJoinRoom}>Выбрать</button></div>
        
    );
}