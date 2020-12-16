import React, { Component } from 'react';
import ListContacts from './ListContacts';


// please note that the static data has been placed outside the component
// ... and not inside it, especially the render method
// ... otherwise, the array would be instantiated with every component render
const contacts = [
  {
    "id": "karen",
    "name": "Karen Isgrigg",
    "handle": "karen_isgrigg",
    "avatarURL": "http://localhost:5001/karen.jpg"
  },
  {
    "id": "richard",
    "name": "Richard Kalehoff",
    "handle": "richardkalehoff",
    "avatarURL": "http://localhost:5001/richard.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "handle": "tylermcginnis",
    "avatarURL": "http://localhost:5001/tyler.jpg"
  }
];


class App extends Component {
  render() {

    return (
      <div>
        <ListContacts contacts={contacts}/>
      </div>
    );
  }
}

export default App;
