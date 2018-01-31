const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined', {skip: req => req.path === '/healthz'}));

app.get('/healthz', (req, res) => res.send('OK'));

app.get('/', (req, res) => res.send('OK'));

app.listen(5000);
