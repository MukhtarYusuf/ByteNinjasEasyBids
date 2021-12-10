const { Server } = require("socket.io");

function setupSocket(server) {
    console.log('In setup socket');
    const io = new Server(server);
 
    io.on('connection', (socket) => {
        console.log('Connected to web socket');
        let counter = 0;

        const intervalId = setInterval(() => {
            console.log('In interval');
            counter++;
            io.emit('counter', counter);
        }, 1000);

        socket.on('disconnect', () => {
            counter = 0;
            clearInterval(intervalId);
            console.log('disconnected from web socket');
        });
    });
}

module.exports.setupSocket = setupSocket;