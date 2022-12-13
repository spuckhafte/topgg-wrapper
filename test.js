const { io } = require('socket.io-client');

const socket = io('http://5ba1-223-233-73-116.ngrok.io');

socket.emit('handshake', '964474872912822323');

socket.on('connected', ok => console.log(ok));

socket.on('test', data => {
  console.log(data);
})

socket.on('upvote', data => {
  console.log(data);
});
