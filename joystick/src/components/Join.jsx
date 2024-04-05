import { useState } from 'react';
import { ChooseRoom } from './ChooseRoom';
import { ChooseRoleAndEnterQueue } from './ChooseRoleAndEnterQueue';
import { Queue } from './Queue';

export function Join({socket, navigate})
{
    const [state, setState] = useState(<ChooseRoom socket={socket} onJoin={chooseRole}/>)
    
    function chooseRole()
    {
        setState(<ChooseRoleAndEnterQueue onEnterQueue={onEnterQueue} onEnterGame={onEnterGame} socket={socket}/>)
    }

    function onEnterQueue(spotInLine)
    {
        setState(<Queue socket={socket} startSpotInLine={spotInLine} onEnterGame={onEnterGame} chooseRole={chooseRole}/>)
    }

    function onEnterGame()
    {
        navigate('/joystick')
    }

    return (state);
}