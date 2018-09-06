import React, {Component} from 'react';


class Nav extends Component {

  render() {
    return (
        <nav className='navbar'>
        <h1>Chatty</h1>
        <h5 className='userCount'>{this.props.userCount} Users Online </h5>
        </nav>
    );
  }
}
export default Nav;
