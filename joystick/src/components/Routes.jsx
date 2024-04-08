import { useEffect } from 'react';
import { TrainControlPanel } from './TrainControlPanel';

export function AppRoutes()
{
  useEffect(()=>{
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'
  }, [])

  return (
    <TrainControlPanel/>
  )
}
