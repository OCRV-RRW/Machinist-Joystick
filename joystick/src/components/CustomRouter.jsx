import { Joystick } from './Joystick';
import { useEffect, useState } from 'react';
import { Home } from './Home';
import { Join } from './Join';


export function CustomRouter({socket}) {
  const [page, setPage] = useState('/');

  function navigate(url) {
    setPage(url);
  }

  function handleRoomIsCloseEvent(e){
    var dir = JSON.parse([e.data]);
    if (dir["Type"] !== "RoomIsClosed") return;
    navigate("/")  
  }

  useEffect(() => {
    socket.addEventListener("message", handleRoomIsCloseEvent);
    return () => {
      socket.removeEventListener("message", handleRoomIsCloseEvent);
    };
  }, []);

  let content;
  if (page === '/') {
    content = <Home socket={socket} navigate={navigate} />;
  } else if (page === '/join') {
    content = <Join socket={socket} navigate={navigate}/>;
  } else if (page === '/joystick') {
    content = <Joystick socket={socket} />;
  }
  return (content);
}
