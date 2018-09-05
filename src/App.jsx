import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';



//
// function buildMessage(content) {
//   return JSON.stringify({
//     id:
//     username:
//     message: content
//   })
// }
//
// function parseMessage(message) {
//   const parsed = JSON.parse(message);
//   return parsed.content;
// }



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    this.ws = new WebSocket('ws://0.0.0.0:3001/');

    this.ws.onopen = evt => {
      console.log('Connected to server!');
    }

    this.ws.onmessage = evt => {
      let parsed = JSON.parse(evt.data)
      const  message = {
        id: parsed.id,
        username: parsed.username,
        content: parsed.content
      }
      this.setState({messages: [...this.state.messages, message] });

    }
  }
    onUserUpdate = name => {
      this.state.currentUser.name = name
    };

    onNewMessage = content => {
      const message = {
        username: this.state.currentUser.name ,
        content: content
      }
      this.ws.send(JSON.stringify(message));
    };


  render() {
    // if (this.state.loading) {
    //   return <h1>Loading...</h1>
    // }
    return (
      <div>
        <Nav />
        <MessageList messages = {this.state.messages} />
        <ChatBar {...this.state.currentUser} onNewMessage = {this.onNewMessage} onUserUpdate = {this.onUserUpdate}/>
      </div>

    );
  }


}
export default App;
