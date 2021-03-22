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
        io.sockets.emit("rainbow-troll");
      } else if ( cmdCOM == "hack" ) {
        msg = "Initiated fake hacks :)";
        io.sockets.emit("hack-troll");
      } else if ( cmdCOM.includes("remove ") == true){
        cmdCOMCOM = cmdCOM.split(" ").pop();
        cmdCOMCOMchange = parseInt(cmdCOMCOM, 10);
        console.log(clientsID[cmdCOMCOMchange])
        io.to(clientsID[cmdCOMCOMchange]).emit("frc");
        msg = "Force kicked member id: " + clientsID[cmdCOMCOMchange];
        clientsID.splice(cmdCOMCOMchange, 1);
        clients -= 1;
      } else if ( cmdCOM == "show-m" ) {
        msg = clientsID;
      } else {
        msg = "Something went wrong; try a different command!  \n Here is a list of commands! \n 1. rainbow  -  makes text on the chat flash colors \n 2. hack  -  makes a black screen pop up saying that they were hacked!";
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
var clientsID = [];

io.on('connection', (socket) => {
  const sessionID = socket.id;
  clients += 1;
  console.log('Client:' + socket.id +'  has connected to the server.');
  socket.emit('welcome', 'Welcome to the chat room!');
  socket.broadcast.emit('connected', 'A client has connected');
  clientsID.push(socket.id);
  io.sockets.emit('num', clients);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('bailed', data => {
    function lik1(e) {
      if (e==data.sID) {
        return e;
      }
    }
    console.log('Client: ' + data.name + ' has bailed.');
    clients -= 1;
    a = clientsID.findIndex(lik1);
    console.log(a)
    clientsID.splice(a, 1);
    socket.broadcast.emit('bailed', {name: data.name});
  })

  socket.on('disconnected', (data) => {
    console.log(data.sID);
    function lik2(e) {
      if (e==data.sID) {
        return e;
      }
    }
    console.log('Client: ' + data.name + ' has disconnected from the server');
    clients -= 1;
    b = clientsID.findIndex(lik2);
    console.log(b)
    clientsID.splice(b, 1);
    io.sockets.emit('disconnected', {name: data.name, clients: clients });
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
  
  socket.on("fdc", (data) => {
      socket.broadcast.emit("fdc", data);
  });
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
  com()
});
