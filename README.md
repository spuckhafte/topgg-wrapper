# Topgg Vote Wrapper
Easily get the data of users whenever they vote your bot,<br>
using [socket.io-client](https://socket.io/docs/v4/client-api/).

### Current server: `http://co.daki.cc:4062`

# Steps
1. `npm i socket.io-client`
2. Put the server address in the **webhook** page of your bot in top.gg (authorization is not required)
![image](https://user-images.githubusercontent.com/70335252/209265996-b8ad6001-bab8-4016-a5de-b41ca8d0472f.png)
3. Initialization in nodejs takes very few steps:
```js
import { io } from 'socket.io-client';

const socket = io('http://co.daki.cc:4062');
const botId = "24134322342342"

socket.emit('handshake', botId);
socket.on('connected', ok => console.log(ok)); // "ok 200"

socket.on('upvote', data => { // whenever someone upvotes your bot
  console.log(data)
  // {"user":"856184519442694154","type":"upvote","query":"","isWeekend":true,"bot":"24134322342342"}
});

socket.on('test', data => { // when you press the `Send Test` button in the webhook page
  console.log(data)
  // {"user":"856184519442694154","type":"test","query":"","bot":"24134322342342"}
});
```
**That's it!**
