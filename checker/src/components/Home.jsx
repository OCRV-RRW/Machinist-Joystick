import { useNavigate } from 'react-router-dom';
import './Home.css'

export function Home({connect})
{
  const navigate = useNavigate();

  return(
    <div class="start-page-container">
      <img src={require('../images/against _rabbits.jpg')}/>
      <button onClick={() => {connect() ;navigate("/Joystick")}}>Подключиться</button>
    </div>
  );
}