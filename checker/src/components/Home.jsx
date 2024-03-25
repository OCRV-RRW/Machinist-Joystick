import { useNavigate } from 'react-router-dom';
import './Home.css'

export function Home({connect, initSocket})
{
  const navigate = useNavigate();

  return(
    <div className="start-page-container">
      <div className="start-page-button-container">
        <img src={require('../images/against _rabbits.png')}/>
        <button onClick={() => {connect(); initSocket();navigate("/Joystick")}}>Подключиться</button>
      </div>
    </div>
  );
}