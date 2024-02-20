import * as React from 'react';
import { useState } from 'react';

const GenText = () => {
  return (<input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>);
}

const MakeGrid = ({height, width}) => {
  const row = [];
    for (let i = 0; i < width; i++) {
      row.push(<GenText key={i}/>);
    }
  return (<row/>);
}

export const Grid = () => {
    // javascript variables that can be used in your components i.e. count
    const [count, setCount] = useState(0);
    const [text, secText] = useState("");
    
    const CompletedGrid = MakeGrid(5, 5);
    console.log(CompletedGrid);
    // the return statement only returns html/xml components
    return (   
      <div>

        <div>
        </div>

        <div>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/></div>
        <div><input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/></div>
        <div><input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/></div>
        <div><input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/></div>

      </div>
    );

};
