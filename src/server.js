const app = require('./app');

/** Create a constant reference to port declared on environment variables
 * or set the port of remote server to 3333.  */
const PORT = process.env.PORT || 3333;

// Bind and listen for connections on the specified port.
app.listen(PORT);
