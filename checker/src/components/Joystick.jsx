import { useState, useEffect } from 'react';

const joinRoom = {"RoomName": "Rabbits","ForServer":true, "Type":"JoinRoom"}
const enterQueue = {"Role": "Assistant","ForServer":true,"Type":"EnterQueue"}

export function Joystick({setRequest, response, open})
{
    const [state, setState] = useState(<div>Joystick</div>)
    const [isConnectedToRoom, setisConnectedToRoom] = useState(false)

    
    function handleRoomResponse(dir)
    {
        if (dir["IsSuchRoom"] === false)
            setisConnectedToRoom(false)
        if (dir["IsSuchRoom"] === true)
            setisConnectedToRoom(true)
    }

    function JoinRoom(){
        setRequest(JSON.stringify({...joinRoom}))
    }

    useEffect(()=> {
        if(open)
            JoinRoom()
    }, [open])

    useEffect(()=> {
        if(isConnectedToRoom === true)
            setRequest(JSON.stringify({...enterQueue}))  
    }, [isConnectedToRoom])

    useEffect(()=>{
        var dir = JSON.parse([response]);
        if (dir['Type'] === 'JoinRoomResponse')
            handleRoomResponse(dir)
    }, [response])

    return (
        state
    );
}