import { CustomRouter } from './CustomRouter';

//var socket = new WebSocket('wss://ocrv-game.ru/Joystick') 
var socket = new WebSocket('ws://localhost:9000/Joystick') // TODO:

console.log("Open socket")
socket.addEventListener("message", (e) => {console.log("receive message: " + e.data)})

export function AppRoutes()
{
    return (
      <CustomRouter socket={socket}/>
    )
}
