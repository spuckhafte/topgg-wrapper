const httpServer = require('http').createServer((req, res) => mainServer(req, res));
const Topgg = require("@top-gg/sdk");
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT | 5001;

let GlobalSocket = null;

io.on('connection', socket => {
    console.log(socket.id);
    GlobalSocket = socket;
})

function mainServer(req) {
    if (req.method == 'POST') {
        req.on('data', data => console.log(data));
    }
}



// Listen HTTP
httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}*`);
});
