const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')


// set template view engine to pug
app.set('view engine', 'pug');

// middleware to serve static files (i.e. images, css, js files)
app.use('/static', express.static('public'));

// middleware to allow for routes to be in a separate file
app.use(routes);

// listen for connections on specified port and console.log when server is running
app.listen(port, () => {
  console.log(`Porfolio app listening on port ${port}`)
});