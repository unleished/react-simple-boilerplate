const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening at ${PORT}`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', broadcastBack);

  ws.on('close', () => console.log('Client disconnected'));



});

wss.broadcast = function(data) {
  let dataObj = JSON.parse(data);
  let broadMessage = {
    id: uuidv4(),
    username: dataObj.username ,
    content: dataObj.content
  }
   wss.clients.forEach(function(client){
console.log('broadcast data: ', broadMessage);
    client.send(JSON.stringify(broadMessage));
  });
}


function broadcastBack(message) {
  console.log(`Received ${message}`)
  let parsed = JSON.parse(message);

  console.log(`User ${parsed.username} said ${parsed.content}`);
  //
  // console.log('parsed: ', parsed)
  //  parsed.status? //we may not need this for chatty.
  //  parsed.timestamp = number(new Date()); // may not need for chatty
   // wss.broadcast(JSON.stringify(parsed))
  wss.broadcast(message);
}
