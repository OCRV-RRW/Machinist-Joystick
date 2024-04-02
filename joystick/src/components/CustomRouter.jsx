import { Joystick } from './Joystick';
import { useCallback, useEffect, useState } from 'react';
import { Home } from './Home';
import { Join } from './Join';
import { Reconnection } from './Reconnection';

export function getSocket(){
  //let socket = new WebSocket('ws://localhost:9000/Joystick') // TODO:
  let socket = new WebSocket('wss://ocrv-game.ru/v2.0/Joystick') // TODO:
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
    console.log("reload")
    navigate('/reconnection')
  })

  useEffect(() => {
    socket.addEventListener("message", handleRoomIsCloseEvent);
    return () => {
      socket.removeEventListener("message", handleRoomIsCloseEvent);
    };
  }, [socket, handleRoomIsCloseEvent]);

  useEffect(() => {
    console.log("CLOSE------------")
    socket.addEventListener("close", handleSocketClose);
    return () => {
      socket.removeEventListener("close", handleSocketClose);
    };
  }, [socket, handleSocketClose]);

  let content;
  
  if (page === '/')
    content = <Home socket={socket} navigate={navigate} />;
  else if (page === '/join')
    content = <Join socket={socket} navigate={navigate}/>;
  else if (page === '/joystick')
    content = <Joystick socket={socket} />;
  else if (page === '/reconnection')
    content = <Reconnection setSocket={setSocket} navigate={navigate}/>

  return (content);
}