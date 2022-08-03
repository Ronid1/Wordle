import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameLogicContextProvider } from './store/game-logic-context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameLogicContextProvider>
    <App />
  </GameLogicContextProvider>
);
