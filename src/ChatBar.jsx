import React, {Component} from 'react';

class ChatBar extends Component {

  enterSubmit = event => {
    if (event.key === 'Enter') {
      const content = event.target.value
      this.props.onNewMessage(content);
      event.target.value = ''
    }
  }

  nameSubmit = event => {
      const newName = event.target.value
      this.props.onUserUpdate(newName);
  }

  render() {
    return (
      <footer className="chatbar" >
        <input
          name='user'
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onBlur={this.nameSubmit}
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
