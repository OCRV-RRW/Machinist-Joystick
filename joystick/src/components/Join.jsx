import { useState, useEffect } from 'react';
import { ChooseRoom } from './ChooseRoom';
import { ChooseRoleAndEnterQueue } from './ChooseRoleAndEnterQueue';
import { Queue } from './Queue';
import { QueueManager } from './QueueManager';

const joinRoom = {"RoomName": "Rabbits","ForServer":true, "Type":"JoinRoom"}
const enterQueue = {"Role": "Assistant","ForServer":true,"Type":"EnterQueue"}

export function Join({socket, navigate})
{
    const [state, setState] = useState(<ChooseRoom socket={socket} onJoin={onJoinRoom}/>)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)
    
    function onJoinRoom()
    {
        setState(<ChooseRoleAndEnterQueue onEnterQueue={onEnterQueue} onEnterGame={onEnterGame} socket={socket}/>)
    }

    function onEnterQueue()
    {
        setState(<QueueManager socket={socket} onEnterGame={onEnterGame}/>)
    }


    function onEnterGame()
    {
        navigate('/joystick')
    }
    // function handleRoomResponse(dir)
    // {
    //     if (dir["IsSuchRoom"] === false)
    //     {
    //         setIsConnectedToRoom(false)
    //         window.location.reload();
    //         navigate("/")
    //     }
    //     if (dir["IsSuchRoom"] === true)
    //         setIsConnectedToRoom(true)
    // }

    // function JoinRoom(){
    //     setRequest(JSON.stringify({...joinRoom}))
    // }

    // useEffect(()=> {
    //     if(open)
    //         JoinRoom()
    // }, [open])

    // useEffect(()=> {
    //     if(isConnectedToRoom === true)
    //         setRequest(JSON.stringify({...enterQueue}))  
    // }, [isConnectedToRoom])

    // useEffect(()=>{
    //     console.log('get response: ' + response)
    //     var dir = JSON.parse([response]);
    //     if (dir['Type'] === 'JoinRoomResponse')
    //         handleRoomResponse(dir)
    //     if (dir['Type'] === 'UpdateSpotInLine')
    //         setState(<Queue spotInLine={dir['SpotInLine']}/>)
    //     if (dir['Type'] === 'LetJoystickIntoGame')
    //     {
    //         setState(<Controller setRequest={setRequest} socket={socket}/>)
    //     }
    // }, [response])

    return (state);
}