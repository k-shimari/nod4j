import * as Express from 'express';
import * as path from 'path';

/*
 * Define the buildpath and send index.html.
 */
const history = require('connect-history-api-fallback');
const app = Express();
app.use(history());
app.use(Express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

/*
 * Define the port for running server.
 */
app.listen(8070, () => {
  console.log('Server running');
});
