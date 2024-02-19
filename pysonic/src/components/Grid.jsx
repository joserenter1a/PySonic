import * as React from 'react';
import { useState } from 'react'
export const Grid = () => {
    // javascript variables that can be used in your components i.e. count
    const [count, setCount] = useState(0);

    
    // the return statement only returns html/xml components
    return (   
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>    
    );

};
