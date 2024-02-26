import { useState, useEffect } from 'react';
import './App.css';
import { Routes } from './components/Routes';


function getWebSocket()
{
  console.log('Create new websocket')
  return new WebSocket('wss://ocrv-game.ru/Joystick')
}

const socket = getWebSocket();
console.log('App')

export default function App() {

  return (
    <Routes socket={socket}/>
  );
}