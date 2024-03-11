import * as React from 'react';
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import axios from 'axios';
import WebSpeech from '../webSpeech/Webspeech';

import 'prismjs/themes/prism.css';
const setHeight = 25;
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
        //textInput.append('\n');
        console.log(textInput);
        rowDownText.focus();
      }
    }
    else if (event.key === 'F1' )
    {
      const rowDownText = document.getElementById(`${0}-${0}`);
      rowDownText.focus();
    }
  });
}


export const GridComponent = () => {
  const [code, setCode] = useState('');

  const [output, setOutput] = useState('');
  const [isLoadingCompile, setIsLoadingCompile] = useState(false);
  const [isLoadingErrorCheck, setIsLoadingErrorCheck] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('5'); // Default to Python (value 5)
  const [error, setError] = useState('');
  const [currentCell, setCurrentCell] = useState({ row: -1, col: -1 });
  
  const handleRun = async () => {
    setIsLoadingCompile(true);
    setError(''); // Clear any previous errors

    const encodedParams = new URLSearchParams();
    encodedParams.set('LanguageChoice', selectedLanguage);
    encodedParams.set('Program', code);

    const options = {
      method: 'POST',
      url: 'https://code-compiler.p.rapidapi.com/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'c40e63ca05msh21cc53be5c61ed5p1be771jsnda85c9acad28',
        'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const result = response.data.Result;
      const errorOutput = response.data.Errors;

      if (errorOutput) {
        setOutput(errorOutput + '\n' + result);
        setError(errorOutput);
      } else {
        setOutput(result);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Error compiling code. Please check your code and try again.');
    }

    setIsLoadingCompile(false);
  };

  const handleSubmit = async () => {
    setIsLoadingErrorCheck(true);
    setError(''); // Clear any previous errors

    const encodedParams = new URLSearchParams();
    encodedParams.set('LanguageChoice', selectedLanguage);
    encodedParams.set('Program', code);

    const options = {
      method: 'POST',
      url: 'https://code-compiler.p.rapidapi.com/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'c40e63ca05msh21cc53be5c61ed5p1be771jsnda85c9acad28',
        'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const errorOutput = response.data.Errors;
      let finalErrorResponse = '';

      // if there is an error
      if (errorOutput) {
        const splitLine = errorOutput.split(" ");
        const splitError = errorOutput.split("\n");
        // find line of error
        for (let i = 0; i < splitLine.length; i++) {
          if (splitLine[i] == "line") {
            finalErrorResponse = "There is an error on " + splitLine[i] + " " + splitLine[i+1];
          }
        }
        // find type of error
        for (let i = 0; i < splitError.length; i++) {
          if (splitError[i].includes("Error")) {
            finalErrorResponse = finalErrorResponse + "\n" + splitError[i];
          }
        }
        // set output for given error
        setOutput(finalErrorResponse);
        setError(finalErrorResponse);
      } else {
        setOutput("There were no errors found.");
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Error compiling code. Please check your code and try again.');
    }

    setIsLoadingErrorCheck(false);
  };
  
  // useState hook to push into an empty array
  const [array, setArray] = useState(() => {
      const emptyArray = [];
      for(let i = 0; i < setHeight; i ++)
      {
        emptyArray.push(Array(setWidth).fill(''));
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
    setCode(newArray.map(row => row.join(' ')).join('\n'));
    
    //announces cell user is in
    if (currentCell.row !== rowIndex || currentCell.col !== colIndex)
    {
      // user changed cells announce the new position
      const cursorPosition = e.target.selectionStart;
      WebSpeech.speak(`line ${rowIndex}, indent ${colIndex}`);
      setCurrentCell({ row: rowIndex, col: colIndex });
    }
    
  }

  //to keep track cursor movement with in a cell
  const handleArrowKeys = (e, rowIndex, colIndex) => {
    const cursorPosition = e.target.selectionStart;
    let newCursorPosition;
  
    switch (e.key) {
      case 'ArrowUp':
        if (cursorPosition >= setWidth) {
          newCursorPosition = cursorPosition - setWidth;
        }
        break;
      case 'ArrowDown':
        if (cursorPosition + setWidth <= e.target.value.length) {
          newCursorPosition = cursorPosition + setWidth;
        }
        break;
      case 'ArrowLeft':
        if (cursorPosition > 0) {
          newCursorPosition = cursorPosition - 1;
        }
        break;
      case 'ArrowRight':
        if (cursorPosition < e.target.value.length) {
          newCursorPosition = cursorPosition + 1;
        }
        break;
      default:
        break;
    }
  
    if (newCursorPosition !== undefined) {
      e.preventDefault();
      e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      WebSpeech.speak(`character ${newCursorPosition + 1}`);
    }
  };

  // returns the array maps to a div with a text input for each cell, with the key
  // being the difference of indices
  return (
    <div style={{display:'flex'}}>

    <div>

    {array.map((row, rowIndex) => (
      <div key={rowIndex}>
          <div style = {{float:'left', 
        paddingLeft: '10px',
        width:'550px',}}></div>
        {row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            id= {`${rowIndex}-${colIndex}`}
            type="text"
            value={cell}
            size = {10}
            onChange={(e) => handleChange(e, rowIndex, colIndex)}
            onFocus={(e) => {
              listener(e, rowIndex, colIndex);
              const cursorPosition = e.target.selectionStart;
              WebSpeech.speak(`line ${rowIndex + 1}, indent ${colIndex}`);
              setCurrentCell({ row: rowIndex, col: colIndex });
          }}
            onKeyDown={(e) => handleArrowKeys(e, rowIndex, colIndex)}
          />
        ))}
      </div>
    ))}

  </div>
    <div
      style={{paddingRight:'30px'}}
      >        
        <Editor 
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.python)}
          padding={10}
          readOnly
          style={{
            padding:'5px',
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            color: 'gray',
            height:'500px',
            backgroundColor: '#171717',
            
            width:'300px',
            /*height:'300px',*/
            
            position: 'relative',
            left:'20px'
            
            /*position:'absolute',
            top:'270px',
            left:'725px'*/
          }}
        />
    </div>
    
    <div
          className='output'
          style={{ display: 'flex', paddingRight:'15px', gap: '10px', width: '300px', height: '300px' }}
        >
        {/* Text area for code output */}
        <textarea
          className="output"
          id="output"
          name="output"
          readOnly
          value={output}
          style={{              
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            color: error ? 'red' : 'black',
            backgroundColor: error ? '#ffebeb' : 'white',
            paddingLeft:'10px',
            paddingRight:'15px',
            width:'300px',
            height: '500px'
          }}
          />
      
      </div>
    <div className="language-buttons-container">
        <center>
          {/* Compilation Button */}
          <button 
            type="button" 
            className="CompileCheckButtons" 
            onClick={handleRun} 
            disabled={isLoadingCompile}>
            {isLoadingCompile ? 'Compiling...' : 'Compile'}
          </button>

          {/* Check Error Button */}
          <button 
            type="button" 
            className="CompileCheckButtons" 
            onClick={handleSubmit} 
            disabled={isLoadingErrorCheck}>
            {isLoadingErrorCheck ? 'Checking for errors...' : 'Check for errors'}
          </button>
        </center>
      </div>
      
    </div>
);
}

export default GridComponent;