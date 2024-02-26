import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Joystick } from './Joystick';
import { useState, useEffect } from 'react';
import { Queue } from './Queue'

console.log('path')

export function Routes({socket})
{

    const [request, setRequest] = useState('');
    const [response, setResponse] = useState('{"Type":null}');
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      socket.onopen = () => {
        console.log("open()")
        setOpen(true)
    }
      socket.onclose = () => {console.log("close()")}
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
        <Router>
            <Switch>
                <Route path="/Joystick">
                    <Joystick setRequest={setRequest} response={response} open={open}/>
                </Route>
            </Switch>
        </Router>
    )
}
