## PySonic: Python Editor

### Project Setup / Installation
When cloning the Repo, make sure you have **node/npm** installed. Version 18+

- [Installation Instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) can be found here. 

Once **node** is installed you need to install the project dependencies before you can run the program. 
- Run `npm install` from the root directory. This will install necessary dependencies and you should see a message **similar** to this:
    - `added ** packages, and audited ** packages in 4s`
    - `found 0 vulnerabilities`

Now you can run the project with `npm run dev` and navigate to `http://localhost:5173/`

This will take you to the current application template.

### Project Strcuture

- `pysonic/` is our root directory for our application. 
- `App.jsx` is the main application container where we will house all of our components. We will not develop any components here.
- `components/` is where we will develop components, `Grid.jsx` is currently in that folder and is placed in the App container. It is not a grid yet just a button but it is done this way for the purpose of demonstrating how to factor out components.

Note: this project was inspired by [Ally IDE](https://ally-ide.herokuapp.com)
