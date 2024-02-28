import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './components/Routes';


function getWebSocket()
{
  console.log('Create new websocket')
  return new WebSocket('wss://ocrv-game.ru/Joystick') 
  //return new WebSocket('ws://localhost:9000/Joystick') // ocrv-game.ru  //localhost:9000
}

const socket = getWebSocket();
console.log('App')


export default function App() {

  return (
    <Router>
      <AppRoutes socket={socket}/>
    </Router>
  );
}