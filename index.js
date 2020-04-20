// Express initialize "app" to be a function handler -> supply to a http server
var app = require('express')();
var http = require('http').createServer(app);
// Initialize a new instance of socket.io
var io = require('socket.io')(http);

// define a route handler '/' that gets called when we hit our website home
app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

// Listen on the connection event for incoming sockets and log it to the console.
io.on('connection', (socket) => {
    // Broadcasting the new connected user except himself
    socket.broadcast.emit('connecting', 'someone join the chatroom');
    // io.emit('connecting', 'someone join the chatroom');

    socket.on('chat message', (msg) => {
        // console.log(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected');
        io.emit('disconnect', 'someone leave the chatroom');
    });
});

// make http server listen on port 3000
http.listen(3000, () => {
    console.log('listening on *:3000');
});