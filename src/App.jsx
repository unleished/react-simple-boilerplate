import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {
          name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        count: 0,
        color: ''
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
      console.log('evt data: ', evt.data)
      let parsed = JSON.parse(evt.data)

      switch(parsed.type) {
        case "incomingMessage":
          const message = {
            id: parsed.id,
            color: parsed.color,
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
        case "incomingConnection":
          this.state.count = parsed.size;

            console.log('parsed size: ', parsed.size)
          break;
        case "colorSetter":
          this.state.color = parsed.color;
          console.log('color: ',this.state.color)
          break;
        default:
          throw new Error("Unknown event type " + parsed.type);
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
        username: this.state.currentUser.name,
        color: this.state.color,
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
        <Nav userCount = {this.state.count} />
        <MessageList messages = {this.state.messages} newNotification = {this.notification} />
        <ChatBar {...this.state.currentUser} onNewMessage = {this.onNewMessage} onUserUpdate = {this.onUserUpdate}/>
      </div>

    );
  }


}
export default App;
