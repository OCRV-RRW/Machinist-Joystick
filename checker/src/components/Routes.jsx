import { useNavigate, Route, Routes} from 'react-router-dom';
import { Joystick } from './Joystick';
import { useState, useEffect } from 'react';
import { Home } from './Home'



var socket = null;

function getWebSocket()
{
  console.log('Create new websocket')
  socket =  new WebSocket('wss://ocrv-game.ru/Joystick') 
  //return new WebSocket('ws://localhost:9000/Joystick') // ocrv-game.ru  //localhost:9000
}

export function AppRoutes()
{
    const navigate = useNavigate();
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState('{"Type":null}');
    const [open, setOpen] = useState(false);
    const [requestQueue, setRequestQueue] = useState([])

    function initSocket() {
      console.log('-------------' + socket)
      socket.onopen =
       () => {
        console.log("open()")
        setOpen(true)
      }
      socket.onclose = () => {
        setOpen(false)
        console.log("close()")
        navigate("/ConnectionError")
      }
      socket.onmessage = (event) => {
        console.log("message() - " + event.data)
        setResponse(event.data)
      }
    }

    useEffect(() => {
      var event = JSON.parse(response);
      if (event['Type'] === "GameOver")
      {
        console.log('close socket yra')
        socket.close()
      }

    }, [response])
  
    useEffect(()=>{
      if (socket === null || socket.readyState !== socket.OPEN)
      {
        console.log("socket is not open "  + request)
        requestQueue.push(request)
        return
      }
      console.log("Send: " + request)
      socket.send(request)
    }, [request])

    useEffect(()=>{
      console.log(requestQueue.length)
      if(open)
      {
        console.log(requestQueue.length)
        requestQueue.forEach((element) => {
          console.log(element)
          socket.send(element)
        });
      }
    }, [open, requestQueue])


    return (
      
        <Routes>
          <Route path="/Joystick" element={<Joystick setRequest={setRequest} response={response} open={open} socket={socket}/>} />
          <Route path="/ConnectionError" element={<ConnectionError/>} />
          <Route path="/" element={<Home connect={getWebSocket} initSocket={initSocket}/>} />
        </Routes>
    )
}


export function ConnectionError()
{
  const navigate = useNavigate();

  function handleReconnection()
  {
    navigate("/")
    console.log('reload current scene')
    //window.location.reload();
  }

  return (<>
      <div>Произошла ошибка при соединении с сервером</div>
      <button onClick={handleReconnection}>Переподключиться</button>
    </>)
}