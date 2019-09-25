import * as Express from 'express';
import * as path from 'path';
const history = require('connect-history-api-fallback');

const app = Express();
app.use(history());

app.use(Express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server running');
});
