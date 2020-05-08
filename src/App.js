import React from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { ConditionGraph } from './Testing'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConditionGraph/>   
      </header>
    </div>
  );
}

export default App;
