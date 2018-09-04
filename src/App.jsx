import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

let nextID = 101;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
            {
              id: 1,
              username: "Bob",
              content: "Has anyone seen my marbles?",
            },
            {
              id: 2,
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
            }
        ]
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');

      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)

      this.setState({messages: messages});
    }, 3000)
  }

  onNewMessage = content => {
    const message = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name ,
      content: content
    }

    this.setState({messages: [...this.state.messages, message] });
  };

  render() {
    // if (this.state.loading) {
    //   return <h1>Loading...</h1>
    // }
    return (
      <div>
        <Nav />
        <MessageList messages = {this.state.messages} />
        <ChatBar {...this.state.currentUser} onNewMessage = {this.onNewMessage}/>
      </div>

    );
  }


}
export default App;
