const httpServer = require('http').createServer((req, res) => mainServer(req, res));
const io = require('socket.io')(httpServer, {
    cors: { origin: "*" }
});
const StringDecoder = require('string_decoder').StringDecoder;

const PORT = process.env.PORT | 5001;

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
      // console.log(req)
        const decoder = new StringDecoder('utf-8');

        webhook.listener(vote => console.log(vote.user));
        let buffer = '';
        req.on('data', data => {
            /*
                payload data comes in streams, small bits.
                This event gets called, collects all the bits and return it to us in a utf-8 format.
                Then we are decoding and storing it in a variable.
            */
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



// Listen HTTP
httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}*`);
});
