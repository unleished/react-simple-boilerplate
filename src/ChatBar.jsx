import React, {Component} from 'react';

class ChatBar extends Component {

  enterSubmit = event => {
    console.log('event', event.target.value)
    if (event.key === 'Enter') {
      const content = event.target.value

      this.props.onNewMessage(content);

    }
  }

  render() {
    const userName = this.props.name
    return (
      <footer className="chatbar" >
        <input
          name='user'
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={userName}
          />
        <input
          onKeyPress={this.enterSubmit}
          name='msgContent'
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          />
      </footer>
);
  }
}
export default ChatBar;
