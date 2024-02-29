import { useNavigate } from 'react-router-dom';
import './Home.css'

export function Home({connect, initSocket})
{
  const navigate = useNavigate();

  return(
    <div className="start-page-container">
      <img src={require('../images/against _rabbits.jpg')}/>
      <button onClick={() => {connect(); initSocket();navigate("/Joystick")}}>Подключиться</button>
    </div>
  );
}