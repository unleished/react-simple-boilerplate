const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
var randomColor = require('random-color');

const PORT = 3001

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening at ${PORT}`));

const wss = new SocketServer({ server });

// Connected users count
const clientCount = () => {
  const countMessage = {
    type: "incomingConnection",
    size: wss.clients.size
  }
  return countMessage
}

//Random color generator
const clientColor = () => {
  const colorMessage = {
    type: "colorSetter",
    color: randomColor().hexString()
  }
  return colorMessage;
}
// send client count and random color generated values on connection
wss.on('connection', (client) => {
  wss.broadcast(clientCount());
  client.send(JSON.stringify(clientColor()));

  console.log('Client connected');

  client.on('message', sendMessage);
  //Updates client count when a client disconnects
  client.on('close', () => {
    wss.broadcast(clientCount());
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
  });
};

// message object creation to send data to client.
sendMessage = function(data) {
  let parsedData = JSON.parse(data)
  let messageType = 'incomingMessage';
  let broadMessage = {
    type: messageType,
    id: uuidv4(),
    color: parsedData.color,
    username: parsedData.username,
    content: parsedData.content
  }
  wss.broadcast(broadMessage)
}
