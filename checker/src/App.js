import { HashRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './components/Routes';
import './config.js'

export default function App() {

  return (
    <HashRouter >
      <AppRoutes/>
    </HashRouter >
  );
}