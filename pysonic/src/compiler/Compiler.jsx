import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

import 'prismjs/themes/prism.css';

const languageOptions = [
  // All available languages

  { label: 'Python', value: '5' },
 
];

function Compiler() {
  const [output, setOutput] = useState('');
  const [isLoadingCompile, setIsLoadingCompile] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('5'); // Default to Python (value 5)
  const [error, setError] = useState('');
  
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

  const testCases = [
      {
  functionCode: `
    def fizz_buzz(n):
        result = []
        for i in range(1, n+1):
            if i % 3 == 0 and i % 5 == 0:
                result.append("FizzBuzz")
            elif i % 3 == 0:
                result.append("Fizz")
            elif i % 5 == 0:
                result.append("Buzz")
            else:
                result.append(str(i))
        return '\n'.join(result)
  `,
expectedOutput: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
`},]

  const runTestCase = async (userCode, expectedOutput) => {
    setIsLoadingCompile(true);
    setError('');
  
    const encodedParams = new URLSearchParams();
    encodedParams.set('LanguageChoice', selectedLanguage);
    encodedParams.set('Program', userCode);
  
    const options = {
      method: 'POST',
      url: 'https://code-compiler.p.rapidapi.com/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'c40e63ca05msh21cc53be5c61ed5p1be771jsnda85c9acad28',
        'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com',
      },
      data: encodedParams,
    };
  
    try {
      const response = await axios.request(options);
      const result = response.data.Result;
      const errorOutput = response.data.Errors;
  
      setIsLoadingCompile(false);
  
      if (errorOutput) {
        setError(errorOutput);
        return 'Test Failed!';
      } else if (result === expectedOutput) {
        return 'Test Passed!';
      } else {
        return 'Test Failed!';
      }
    } catch (error) {
      console.error(error);
      setError('Error compiling code. Please check your code and try again.');
      setIsLoadingCompile(false);
      return 'Test Failed!';
    }
  };

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);
    const testCase = testCases[0];
    const userCode = code;
    // const testResult = await runTestCase(userCode, testCase.expectedOutput);

    // if (testResult === 'Test Failed!') {
    //   setError(true);
    //   const finalOutput = `${testResult}\n\nExpected Output:\n${testCase.expectedOutput}`;
    //   setOutput(finalOutput); 
    //   setIsLoadingSubmit(false);
    // } else {
    //   const finalOutput = `${testResult}\n\nYour Output:\n${testCase.expectedOutput}`;
    //   setOutput(finalOutput); 
    //   setIsLoadingSubmit(false);
    // }
    const finalOutput = `There are errors on lines....${userCode}`

    // want to move user focus here to output so screen reader can announce errors

    setOutput(finalOutput)
    setIsLoadingSubmit(false)
  };

  return (
    <div>
      <h2 className="compiler-title">Code Compiler</h2>

      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>  {/* Div around Text area */}
          <div
            className='input'
            style={{ display: 'fill', gap: '10px', width: '100%', height: '100%' }}
          >
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.python)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              color: 'gray',
              height: '100%',
              backgroundColor: '#171717',
            }}
          />
          </div>

        <div
          className='output'
          style={{ display: 'flex', gap: '10px', width: '100%', height: '100%' }}
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
          }}
          />
          </div>
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
            disabled={isLoadingSubmit}>
            {isLoadingSubmit ? 'Checking for errors...' : 'Check for errors'}
          </button>
        </center>
      </div>
    </div>
  );
}
export default Compiler;
