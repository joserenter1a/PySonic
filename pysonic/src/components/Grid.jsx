import * as React from 'react';
import { useState } from 'react';

const setHeight = 10;
const setWidth = 5;

const listener = (e, row, col) =>{
  const textInput = document.getElementById(`${row}-${col}`);
  textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // console.log('Enter key pressed!');
      if (row == setHeight-1) {
        // deal with enter on last line of text
        // console.log("in last row");
      }
      else {
        // move focus to next line
        const rowDownText = document.getElementById(`${row+1}-${0}`);
        rowDownText.focus();
      }
    }
    else if (event.key === 'Tab'){
      if (col == setWidth-1){
        // console.log("At last col, don't tab to next row");
        event.preventDefault();
      }
    }
  });
}


const GridComponent = ({height, width}) => {

  // useState hook to push into an empty array
  const [array, setArray] = useState(() => {
      const emptyArray = [];
      for(let i = 0; i < height; i ++)
      {
        emptyArray.push(Array(width).fill(''));
      }
      return emptyArray;
    }
  );

  // event Handler for the array to set the empty array and map each (i,j) position to each corresponding cell
  const handleChange = (e, rowIndex, colIndex) => {
    const newArray = array.map((row, i) => 
    i === rowIndex ? row.map((cell, j) => (j === colIndex ? e.target.value : cell)) : row
    );
    setArray(newArray);
  }
  // returns the array maps to a div with a text input for each cell, with the key
  // being the difference of indices
  return (
    <div>
    {array.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            id= {`${rowIndex}-${colIndex}`}
            type="text"
            value={cell}
            onChange={(e) => handleChange(e, rowIndex, colIndex)}
            onFocus={(e) => listener(e, rowIndex, colIndex)}
          />
        ))}
      </div>
    ))}
  </div>
);
};

export const Grid = () => {
    // javascript variables that can be used in your components i.e. count
    const [count, setCount] = useState(0);
    const [text, secText] = useState("");
    const [focused, setFocus] = useState(false);
        // the return statement only returns html/xml components
    return (   
      <div>

        <div>
          <GridComponent
            height = {setHeight}
            width = {setWidth}
          />
        
        </div>
      </div>
    );

};
