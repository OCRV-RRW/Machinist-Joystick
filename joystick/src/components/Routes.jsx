import { useEffect } from 'react';
import { CustomRouter } from './CustomRouter';

export function AppRoutes()
{
  // window.oncontextmenu = function() { return false; }

  useEffect(()=>{
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'
  }, [])

  return (
    <CustomRouter/>
  )
}
