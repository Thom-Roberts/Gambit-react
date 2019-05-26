import React from 'react';
import { main } from './services/ProfileRequest';


class App extends React.Component {
  render() {
    return (
      <div>
        App is working
        <button onClick={main('Warrior342')}>Send Request</button>
      </div>
    );
  }
}

export default App;
