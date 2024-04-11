import { Joystick } from './Joystick';
import { useCallback, useEffect, useState } from 'react';
import { Home } from './Home';
import { Join } from './Join';
import { Reconnection } from './Reconnection';
import { TrainControlPanel } from './TrainControlPanel'

export function getSocket(){
  let socket = new WebSocket('wss://ocrv-game.ru/v2.0/Joystick')
  console.log("Open socket")
  socket.addEventListener("message", (e) => {console.log("receive message: " + e.data)})
  return socket
}

var webSocket = getSocket()

export function CustomRouter() {
  const [page, setPage] = useState('/');
  const [socket, setSocket] = useState(webSocket)

  function navigate(url) {
    setPage(url);
  }

  const handleRoomIsCloseEvent = useCallback( (e) => {
    var dir = JSON.parse([e.data]);
    if (dir["Type"] !== "RoomIsClosed") return;
    navigate("/")  
  })

  const handleSocketClose = useCallback(() =>
  {
    console.log("socket is closed")
    navigate('/reconnection')
  })

  useEffect(() => {
    socket.addEventListener("message", handleRoomIsCloseEvent)
    return () => {
      socket.removeEventListener("message", handleRoomIsCloseEvent)
    };
  }, [socket, handleRoomIsCloseEvent])

  useEffect(() => {
    socket.addEventListener("close", handleSocketClose)
    return () => {
      socket.removeEventListener("close", handleSocketClose)
    };
  }, [socket, handleSocketClose])

  let content

  switch(page) {
    case '/':
      content = <Home socket={socket} navigate={navigate} />
      break
    case '/join':
      content = <Join socket={socket} navigate={navigate}/>
      break
    case '/joystick':
      content = <Joystick socket={socket} navigate={navigate}/>
      break
    case '/reconnection':
      content = <Reconnection setSocket={setSocket} navigate={navigate}/>
      break
    case '/trainControlPanel':
      content = <TrainControlPanel socket={socket} navigate={navigate}/>
      break
    default:
      content = <Home socket={socket} navigate={navigate} />
      break
  }
  return (content);
}