import * as React from 'react';
import { useState } from 'react';

const GenText = () => {
  return (<input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>);
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
            type="text"
            value={cell}
            onChange={(e) => handleChange(e, rowIndex, colIndex)}
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
        // the return statement only returns html/xml components
    return (   
      <div>

        <div>
          <GridComponent
            height = {10}
            width = {5}
          />
        </div>
      </div>
    );

};
