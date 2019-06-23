import React from 'react';
import { main } from './services/ProfileRequest';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'username': '',
      'membershipId': '',
      'membershipType': '',
      'characters': [],
      'historicalStats': [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleManifestClick = this.handleManifestClick.bind(this);
  }

  handleChange(event) {
    this.setState({'username': event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let prom = main(this.state.username);

    prom.then(response => {
      this.setState({
        'membershipId': response.membershipId,
        'membershipType': response.membershipType,
        'characters': response.characters,
        'historicalStats': response.stats,
      });
    }).catch(reason => {
      alert(`Failed with response: ${reason}`);
    });
  }

  handleManifestClick(event) {
    event.preventDefault();

    alert('clicked button');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          <button type="submit">Send name</button>
        </form>

        <button onClick={this.handleManifestClick}>Get Manifest</button>

        <div>
          Membership id: <span>{this.state.membershipId}</span>
        </div>

        <div>
          Membership type: <span>{this.state.membershipType}</span>
        </div>

        {this.state.characters.length > 0 &&
          <ul>
            {this.state.characters.map(character => {
              return <li key={character}>
                  {character}
                </li>
            })}
          </ul>
        }

        {this.state.historicalStats.length > 0 &&
          <div>
            {this.state.historicalStats.map((characterStats, index) => {
              return <ul key={this.state.characters[index].id}>
                {Object.keys(characterStats).map(key => {
                  return <li>
                    {key}: {characterStats[key].basic.displayValue}
                  </li>
                })}

              </ul>
            })}
          </div>
        }


      </div>
    );
  }
}

export default App;
