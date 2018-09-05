const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening at ${PORT}`));

const wss = new SocketServer({ server });

wss.on('connection', (client) => {
  console.log('clients: ', wss.clients.size)
  console.log('Client connected');

  client.on('message', broadcastBack);
  client.on('close', () => {
    console.log('Client disconnected')
  });
  // client.send(wss.clients.size);
  // let data = {
  //   type: 'incomingCount',
  //   username: "Server",
  //   content: wss.clients.size
  // }
  // wss.broadcast(data)

});

wss.broadcast = function(data) {
  let messageType = 'incomingMessage';
  // if (data.type !== undefined) {
  //   messageType = data.type
  // }
  let broadMessage = {
    type: messageType,
    id: uuidv4(),
    username: data.username,
    content: data.content
  }
   wss.clients.forEach(function(client){
    console.log('broadcast data: ', broadMessage);
    client.send(JSON.stringify(broadMessage));
  });
}

function broadcastBack(message) {
  // console.log(`Received ${message}`)
  let parsed = JSON.parse(message);
  console.log(`User ${parsed.username} said ${parsed.content}`);
  wss.broadcast(parsed);
}
