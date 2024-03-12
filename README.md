## PySonic: Python Editor
A web-based code editor for BLV (blind and low-vision) beginner programmers.

Authors: Leo Abrahamian, Carson Hellman, Joseph Macalinao, Cameron O’Connor, Jose Renteria

Created on February 21st, 2024
A project for CS422 - Software Methodologies

### Project Setup / Installation
When cloning the Repo, make sure you have **node/npm** installed. 
Version 18+

- [Installation Instructions] (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) can be found here. 

Once **node** is installed, you need to install the project dependencies before you can run the program. 
- Run `npm install` from the root directory. This will install necessary dependencies and you should see a message **similar** to this:
    - `added ** packages, and audited ** packages in 4s`
    - `found 0 vulnerabilities`

Now you can run the project with `npm run dev` and navigate to `http://localhost:5173/`

This will take you to the current application template.

### Project Structure

- `pysonic/` is our root directory for our application. 
- `src/App.jsx` is the main application container where we will house all of our components. We will not develop any components here.
- `src/components/` is where we will develop components, `Grid.jsx` is currently in that folder and is placed in the App container. It is not a grid yet just a button that updates a count but it is done this way for the purpose of demonstrating how to factor out components.
- `Compiler.jsx` provides a python editor with both input and output. You can toggle an IgnoreTabKey prop which determines whether the editor should ignore tab key presses so that keyboard users can tab past the editor. Users can toggle this behavior using `Ctrl+Shift+M (Mac)` /` Ctrl+M` manually when this is false
    - NOTE: The input needs to be changed to a grid based input.
    - A button for surveying the code still needs to be added

Note: this project was inspired by [Ally IDE](https://ally-ide.herokuapp.com)
