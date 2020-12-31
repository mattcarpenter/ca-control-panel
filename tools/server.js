const Net = require('net');
const http = require('http');

const STREAMING_ENCODER_PORT = 9800;
const WEB_API_PORT = 9801;

const streamingEncoderServer = new Net.Server();
streamingEncoderServer.listen(STREAMING_ENCODER_PORT, function () {
  console.log(
    `[STREAMING ENCODER] Listening for connection requests on socket localhost:${STREAMING_ENCODER_PORT}`
  );
});

streamingEncoderServer.on('connection', function (socket) {
  console.log('[STREAMING ENCODER] connection established');

  socket.on('data', function (chunk) {
    console.log(`[STREAMING ENCODER] ${JSON.stringify(chunk.toString())}`);
  });

  socket.on('end', function () {
    console.log('[STREAMING ENCODER] Closing connection with the client');
  });

  // Don't forget to catch error, for your own sake.
  socket.on('error', function (err) {
    console.log(`[STREAMING ENCODER] Error: ${err}`);
  });
});

const apiRequestListener = function (req, res) {
  res.writeHead(200);
  console.log('[WEB API]', req.method, req.url);
  let body = '';
  req.on('readable', function () {
    body += req.read();
  });
  req.on('end', function () {
    console.log('[WEB API]', req.headers);
    console.log('[WEB API]', body);
    res.write('OK');
    res.end();
  });
};

const apiServer = http.createServer(apiRequestListener);
apiServer.listen(WEB_API_PORT);
