import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from './Controller';
const joinRoom = {"RoomName": "Rabbits","ForServer":true, "Type":"JoinRoom"}
const enterQueue = {"Role": "Assistant","ForServer":true,"Type":"EnterQueue"}


export function Joystick({setRequest, response, open, socket})
{
    const [state, setState] = useState(<div>Joystick</div>)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)
    const navigate = useNavigate();
    
    function handleRoomResponse(dir)
    {
        if (dir["IsSuchRoom"] === false)
        {
            setIsConnectedToRoom(false)
            navigate("/ConnectionError")
            console.log('setisconnectedToRoom false ---')
        }
        if (dir["IsSuchRoom"] === true)
        {
            setIsConnectedToRoom(true)
        }
    }

    function JoinRoom(){
        setRequest(JSON.stringify({...joinRoom}))
    }

    useEffect(()=> {
        if(open)
        {
            console.log('Join room ')
            JoinRoom()
        }

            
    }, [open])

    useEffect(()=> {
        if(isConnectedToRoom === true)
            setRequest(JSON.stringify({...enterQueue}))  
    }, [isConnectedToRoom])

    useEffect(()=>{
        console.log('get response ------- ' + response)
        var dir = JSON.parse([response]);
        if (dir['Type'] === 'JoinRoomResponse')
            handleRoomResponse(dir)
        if (dir['Type'] === 'UpdateSpotInLine')
            setState(<Queue spotInLine={dir['SpotInLine']}/>)
        if (dir['Type'] === 'LetJoystickIntoGame')
        {
            setRequest(JSON.stringify({"Role":"Assistant","Type":"StartGameplay","ForServer":false}))
            setState(<Controller setRequest={setRequest} socket={socket}/>)
        }
    }, [response])

    return (
        state
    );
}

export function Queue({spotInLine})
{
    return(
    <>
    <h1>Queue</h1>
    <div>{spotInLine}</div>
    </>)
}