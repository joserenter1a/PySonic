import React from 'react';
import './App.css'
// import custom component to embed in our application container
import { Grid } from './components/Grid';

function App() {

  return (
    <>
      <h1>Home Page for da Code Editor</h1>
      <div className="card">
          <div>
            <Grid/>
          </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test 
        </p>
      </div>


    </>
  )
}

export default App
