const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.use(express.static('src/client'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A new user connected');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('submitImg', (src) => {
    console.log('Client sent image')

    //Client submit an image
    io.emit('sentImg', src) //the server send the image src to all clients
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
