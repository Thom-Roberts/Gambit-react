import React from 'react';
import { main } from './services/ProfileRequest';
import { SendManifestRequest } from './services/Games';
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
    event.preventDefault();
    //let prom = main(this.state.username);
    let prom = SendManifestRequest();
    console.log(prom);
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
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          <button type="submit">Send name</button>
        </form>

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
