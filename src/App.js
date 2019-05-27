import React from 'react';
import { main } from './services/ProfileRequest';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'username': '',
      'membershipId': '',
      'membershipType': '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({'username': event.target.value});
  }

  handleSubmit(event) {
    let prom = main(this.state.username);
    prom.then(response => {
      this.setState({
        'membershipId': response.membershipId,
        'membershipType': response.membershipType,
      });
    }).catch(reason => {
      alert(`Failed with response: ${reason}`);
    });
  }

  render() {
    return (
      <div>
        <div>
          Send default request
          <button onClick={() => main('Warrior342')}>Send Request</button>
        </div>
        <div>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Send name</button>
        </div>

        <div>
          Membership id: <span>{this.state.membershipId}</span>
        </div>

        <div>
          Membership type: <span>{this.state.membershipType}</span>
        </div>
      </div>
    );
  }
}

export default App;
