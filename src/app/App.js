import React, {Component} from 'react';
import './App.css';
import ListOfPeople from './ListOfGolfers';

class App extends Component {
  render () {
    return (
      <div>
        <header>
          <div>Best Golfers</div>
        </header>
        <div className="main-body">
          <ListOfPeople/>
        </div>
      </div>
    );
  }
}

export default App;