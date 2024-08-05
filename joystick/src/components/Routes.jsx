import { useEffect } from 'react';
import { CustomRouter } from './CustomRouter';

export function AppRoutes()
{
  window.oncontextmenu = function() { return false; }

  useEffect(()=>{
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'
    document.ondragstart   = false;
    document.onselectstart = false;
    document.ondragstart = () => false
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }, [])

  return (
    <CustomRouter/>
  )
}
