import http from 'http';
import { Server } from 'socket.io'
import { StringDecoder } from 'string_decoder'

const httpServer = http.createServer((req, res) => mainServer(req, res));
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT;

let GlobalSocket = null;
let BotId = null;

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('handshake', botId => {
      GlobalSocket = socket;
      BotId = botId;
      socket.emit('connected', 'ok 200');
    });
});

function mainServer(req, res) {
    if (!GlobalSocket) return;
    if (req.method == 'POST') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';
        req.on('data', data => {
            buffer += decoder.write(data);
        });
        req.on('end', () => {
            buffer += decoder.end();
            if (JSON.parse(buffer).bot != BotId) return;
            GlobalSocket.emit(JSON.parse(buffer).type, buffer);
        });
        res.end('ok');
    }
}

httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}*`);
});
