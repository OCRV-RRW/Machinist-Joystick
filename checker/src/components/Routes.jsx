import { useNavigate, Route, Routes} from 'react-router-dom';
import { Joystick } from './Joystick';
import { useState, useEffect } from 'react';
import { Home } from './Home'

export function AppRoutes({socket})
{
    const navigate = useNavigate();
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState('{"Type":null}');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      console.log('-------------' + socket)
      socket.onopen =
       () => {
        console.log("open()")
        setOpen(true)
      }
      socket.onclose = () => {
        console.log("close()")
        navigate("/ConnectionError")
      }
      socket.onmessage = (event) => {
        console.log("message() - " + event.data)
        setResponse(event.data)
      }
    }, [])
  
    useEffect(()=>{
      if (socket.readyState !== socket.OPEN)
      {
        console.log("socket is not open")
        return
      }
      console.log("Send: " + request)
      socket.send(request)
    }, [request])

    return (
      
        <Routes>
          <Route path="/Joystick" element={<Joystick setRequest={setRequest} response={response} open={open} socket={socket}/>} />
          <Route path="/ConnectionError" element={<ConnectionError isOpen={open}/>} />
          <Route path="/" element={<Home setRequest={setRequest}/>} />
        </Routes>
    )
}


export function ConnectionError({})
{
  const navigate = useNavigate();

  function handleReconnection()
  {
    navigate("/")
    console.log('reload current scene')
    window.location.reload();
  }

  return (<>
      <div>Произошла ошибка при соединении с сервером</div>
      <button onClick={handleReconnection}>Переподключиться</button>
    </>)
}