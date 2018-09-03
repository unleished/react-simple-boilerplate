import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <main className="messages">
            <Message />
            <MessageList />
        </main>
        <ChatBar />
      </div>

    );
  }
}
export default App;
