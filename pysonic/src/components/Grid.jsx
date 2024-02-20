import * as React from 'react';
import { useState } from 'react';
export const Grid = () => {
    // javascript variables that can be used in your components i.e. count
    const [count, setCount] = useState(0);
    const [text, secText] = useState("");
    let col = [];
    for (let i = 0; i < 100; i++){
      let row = [];
      for (let j = 0; j < 8; j++){
        row.push([]);
      }
      col.push(row);
    }
    console.log(col);
    // the return statement only returns html/xml components
    return (   
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
        <div><input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/>
        <input type="text" id="name" name="name" required minLength="4" maxLength="8" size="10"/></div>

      </div>
    );

};
