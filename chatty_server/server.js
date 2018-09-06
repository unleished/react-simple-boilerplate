const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening at ${PORT}`));

const wss = new SocketServer({ server });

// client.send(wss.clients.size);

// let clients = {
//   type:
//   count: wss.clients.size
// }
//
// const clientConnected = (client, clientID) => {
//   clients = {
//     id: clientID,
//     color: ''
//   }
// }
//
// const clientDisconnected = clientID => {
//   // const client = clients[clientID]
//   delete clients[clientID]
// }
// // wss.broadcast(data)

const clientCount = () => {
  const countMessage = {
    type: "incomingConnection",
    size: wss.clients.size
  }
  return countMessage
}

const clientColor = () => {
  let colorOptions = ['#5C4A4A', '#4A5C4F', '#763B3B', '#647F8F']
  const colorMessage = {
    type: "colorSetter",
    color: ''
  }


}

wss.on('connection', (client) => {
  wss.broadcast(clientCount());

  console.log('Client connected');

  client.on('message', sendMessage);
  client.on('close', () => {
    wss.broadcast(clientCount());

  });

});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === wss.OPEN) {
      client.send(JSON.stringify(data));
    // }
  });
};

sendMessage = function(data) {
  let parsedData = JSON.parse(data)
  let messageType = 'incomingMessage';

  let broadMessage = {
    type: messageType,
    id: uuidv4(),
    username: parsedData.username,
    content: parsedData.content
  }
  wss.broadcast(broadMessage)
}
