import { getSocket } from './CustomRouter';
import "./Reconnection.css"

export function Reconnection({ setSocket, navigate }) {
  function handleReconnect() {
    console.log(setSocket);
    setSocket(getSocket());
    navigate('/');
  }

  return (
    <button id='reconnection-button' className='default-button' onClick={handleReconnect}>
      Переподключиться
    </button>);
}
