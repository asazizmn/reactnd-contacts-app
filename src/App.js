import React, { Component } from 'react';
import ListContacts from './ListContacts';



class App extends Component {

  state = {
    contacts: [
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
    ]
  };


  /* 
   * please note that this method will only be executing setState, not returning anything 
   */
  removeContact = contact => {

    // the anonymous function provided here will be returning a new contacts array to setState
    // ... in order for it to help replace/merge the new state with the old state 
    // please note the use of brackets to help implicitly return the containing object
    this.setState(prevState => ({

      // please note that we're modifying `prevState`, and not `this.state.contacts`
      // ... the reason is obviously because we're working with `setState` and need to 
      // ... work with the provided state within
      // we're simply creating a new array of elements that pass the test
      // ... `item => item.id !== contact.id`
      contacts: prevState.contacts.filter(item => item.id !== contact.id)
    }))
  }


  render() {
    return (
      <div>
        <ListContacts
          // contacts={this.state.contacts}
          contacts={this.state.contacts}
          onContactDelete={this.removeContact}
        />
      </div>
    );
  }
}



export default App;
