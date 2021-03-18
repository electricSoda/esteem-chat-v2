const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3002;
const fs = require('fs');

app.use(express.static('public'));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/');
});

var rl = require('readline');
var EE = true

function com() {
  if ( EE == true ) {       
    var prompts = rl.createInterface(process.stdin, process.stdout);
    prompts.question(">>", function(cmdCOM){
     
      var msg = "";
     
      if( cmdCOM == "rainbow" ) {
        msg = "Initiated rainbow troll";
        io.sockets.emit("rainbow-troll")
      }
      console.log(msg);
      EE = true
      com()
    });
    EE = false
    com()
  } 
}

var clients = 0;

io.on('connection', (socket) => {
  clients += 1;
  console.log('Client:' + socket.id +'  has connected to the server.');
  socket.emit('welcome', 'Welcome to the chat room!');
  socket.broadcast.emit('connected', 'A client has connected');
  io.sockets.emit('num', clients);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('bailed', data => {
    clients -= 1;
    socket.broadcast.emit('bailed', data);
  })

  socket.on('disconnected', (data) => {
    console.log('Client: ' + data + ' has disconnected from the server');
    clients -= 1;
    io.sockets.emit('disconnected', {name: data, clients: clients });
  });

  socket.on('type', (data)=>{
    var typemsg = data + ' is typing...'
    socket.broadcast.emit('type', typemsg);
  });

  socket.on('stoptype', (data)=>{
    socket.broadcast.emit('stoptype', data)
  });

  socket.on('link', (data)=>{
    io.sockets.emit('link', data);
  });
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
  com()
});
