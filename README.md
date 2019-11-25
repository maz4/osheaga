[Osheaga website link - https://fast-dusk-28072.herokuapp.com/](https://fast-dusk-28072.herokuapp.com/)

# Osheaga

App to use API to fetch and show buses for the Osheaga festival from New York to Montreal.

Osheaga is a website which searches for a bus connection in the prespecified locations.
Fetching the data is split into multiple requests which are depended on the server response.
If in the received data field "complete" is false the website will resend request into specified 
/poll address. It will also check the index of departures array to fetch only the data which is new on the server.
When "complete" field has the value true the fetching data is complete.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
