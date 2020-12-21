import React, { Component } from 'react';
import icon from '../../assets/img/icon-128.png';
import icon2 from '../../assets/img/icon-34.png'

class GreetingComponent extends Component {
  state = {
    name: 'dev',
  };

  render() {
    return (
      <div>
        <p>Hello, {this.state.name}!</p>
        <img src={icon} alt="extension icon" />
      </div>
    );
  }
}

export default GreetingComponent;
