import { Component } from 'react';
import './App.css';
import Table from './Table';
import Form from './Form';
import Gallery from './Gallery';

class App extends Component {
  state = {
    characters: [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
    ]
  }
  removeCharacter = (index) => {
    const {characters} = this.state
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      })
    })
  }
  handleSubmit = (character) => {
    this.setState({characters: [...this.state.characters, character]})
  }
  render() {
    const {characters} = this.state;
    return (
      <div className="App">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
        <Gallery />
      </div>
    );
  }
}

export default App;
