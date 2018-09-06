import React, {Component} from 'react';

class Message extends Component {


  render() {
    const inlineStyle = {color: this.props.color}

    return (
      <div className="message" >
        <span className="message-username" style={inlineStyle}>{this.props.username} </span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
