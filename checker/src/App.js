import { HashRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './components/Routes';

export default function App() {
  return (
    <HashRouter >
      <AppRoutes/>
    </HashRouter >
  );
}