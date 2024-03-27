import './Home.css'

export function Home({connect, navigate})
{
  function handleOnStart()
  {
    navigate("/join")
  }

  return(
    <div className="start-page-container">
      <div className="start-page-button-container">
        <img src={require('../images/against _rabbits.png')}/>
        <button onClick={handleOnStart}>Подключиться</button>
      </div>
    </div>
  );
}