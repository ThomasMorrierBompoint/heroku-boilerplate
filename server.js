const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);

const SERVER_PORT = 5000;

app.enable('trust proxy');
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(express.static('public'));

// This should be the last route
app.all('*', (req, res) => {
  res.statusCode = 404;
  res.send('NOT FOUND 404');
});

// Handle error
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.send('INTERNAL ERROR 500');
});

server.listen(process.env.PORT || SERVER_PORT, () => {
  console.log('Express server listening on port %d in %s mode.', SERVER_PORT, app.get('env'));
});
