import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    // or 使用這行
    // this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Hello world!!</h1>
        <hr/>
        <input type="text" onChange={this.handleTextChange.bind(this)} />
        <p><strong>你輸入的是</strong></p>
        <p>
          <span>{this.state.message}</span>
        </p>
      </div>
    );
  }
}
