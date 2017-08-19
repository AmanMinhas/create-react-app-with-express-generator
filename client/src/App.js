import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    };
  }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        {users.map((user, key) => {
          return (
            <div key={key}>
              {user.fname} {user.lname}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
