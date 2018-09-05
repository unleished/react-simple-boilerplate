import React, {Component} from 'react';


class Nav extends Component {

  render() {
    return (
        <nav className='navbar'>
        <h1>Chatty</h1>
        {this.props.userCount}
        </nav>
    );
  }
}
export default Nav;
