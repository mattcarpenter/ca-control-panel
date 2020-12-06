const Net = require('net');

const STREAMING_ENCODER_PORT = 9000;

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
