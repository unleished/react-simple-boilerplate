import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.ws = new WebSocket('ws://0.0.0.0:3001/');
    this.ws.onopen = evt => {
      console.log('Connected to server!');
    };

    this.ws.onconnection = evt => {
      console.log('onConnection: ', evt)

    }


    this.ws.onmessage = evt => {
      let parsed = JSON.parse(evt.data)

      switch(parsed.type) {
        case "incomingMessage":
          const message = {
            id: parsed.id,
            username: parsed.username,
            content: parsed.content
          }
          this.setState({messages: [...this.state.messages, message] });

          break;
        case "incomingNotification":
          function newNotification(parsed){
            var notification = (
              <div>
                <p>{parsed.content}</p>
              </div>
            );

          }
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }
    onUserUpdate = (name) => {
      const userUpdate = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their username to ${name}.`
      }
      this.ws.send(JSON.stringify(userUpdate));

      this.state.currentUser.name = name
    };

    onNewMessage = content => {
      const message = {
        type: "postMessage",
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
        <Nav userCount = {this.userCount} />
        <MessageList messages = {this.state.messages} newNotification = {this.notification} />
        <ChatBar {...this.state.currentUser} onNewMessage = {this.onNewMessage} onUserUpdate = {this.onUserUpdate}/>
      </div>

    );
  }


}
export default App;
