import { useEffect } from "react";
import { joinRoom } from "./events"

const roomName = 'Rabbits'

export function Queue({setRequest, response})
{

    // function JoinRoom(){
    //     console.log('joinRoom')
    //     var joinEvent = {...joinRoom}
    //     joinEvent['RoomName'] = roomName
    //     console.log(setRequest)
    //     setRequest(joinRoom)
    // }

    // useEffect(()=> {
    //     JoinRoom()
    // }, [])

    return(
        <div>Hello</div>
    );
}