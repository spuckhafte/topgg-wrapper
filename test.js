const { io } = require('socket.io-client');

const socket = io('https://topgg-wrapper-production.up.railway.app');
socket.emit('handshake', '964474872912822323'); // bot-id

socket.on('connected', ok => console.log(ok));

socket.on('test', data => {
  console.log(data);
})

socket.on('upvote', data => {
  console.log(data);
});
