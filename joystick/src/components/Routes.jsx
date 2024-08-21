import { useEffect } from 'react';
import { CustomRouter } from './CustomRouter';

export function AppRoutes()
{
  window.oncontextmenu = function() { return false; }

  useEffect(()=>{
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    document.ondragstart   = false;
    document.onselectstart = false;
    document.ondragstart = () => false
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;      
    };


    // отключение zoom через скролл (в том числе трекападами в macOS)
    document.addEventListener('mousewheel', function(e){
      if(!e.ctrlKey && !e.metaKey) return;

      e.preventDefault();
      e.stopImmediatePropagation();
    }, {passive:false});

    // отключение zoom прикосновениями (в том числе трекападами и т.п.) в Safari и iOS
    document.addEventListener('gesturestart', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
    }, {passive:false});
  }, [])

  return (
    <CustomRouter/>
  )
}
