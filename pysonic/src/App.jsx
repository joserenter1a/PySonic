import React, {useState} from 'react';
import './App.css'
// import custom component to embed in our application container
import GridComponent  from './components/Grid';

function App() {

  return (
    <>
      <img src="/PySonicLogo.png" alt="Description of the image" width="193" height="130"></img>
      <div >
        
          <div
            style={gridStyle}
          >
            <GridComponent

            />
          </div>
      </div>


    </>
  )
}
const gridStyle ={
  overflowY: 'auto',
 backgroundColor:'black', 
 padding: '15px', 
 height: '500px',
 width: '1000px'
}
export default App;


