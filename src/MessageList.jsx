import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messageList = this.props.messages.map((message) =>
    <Message key={message.id} username={message.username} content={message.content}  color={message.color}/>

  );
    return (
      <main className="messages">
        <div id="messageSystem" className="message system">
          {this.props.notification}
        </div>
        {messageList}
      </main>

    );
  }
}
export default MessageList;
