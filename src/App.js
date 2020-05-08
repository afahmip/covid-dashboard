import React from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { Choropleth } from './components/Choropleth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Choropleth />
      </header>
    </div>
  );
}

export default App;
