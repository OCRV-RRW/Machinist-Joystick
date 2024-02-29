import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Connection.css"

export function Connection()
{
    const navigate = useNavigate()

    useEffect(()=>{
        console.log('navigate')
        var timer1 = setTimeout(() => {console.log('navigate end');navigate("/")}, 3000);
        return () => {
            clearTimeout(timer1);
        }
    }, [])
    return (
        <p className="connection">Подключение . . .</p>
    );
}