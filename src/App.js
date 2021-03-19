import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';



class App extends Component {

    state = {
        contacts: [],
        screen: 'create'
    };


    /*
     * retrieves the contacts data, and sets it to our local state as a result
     */
    componentDidMount = () => {

        // please note that `.getAll()` returns a promise (which is an object since ES6)
        // ... that will be containing our desired data
        // ... which in turn can be accessed through it's `.then()` method 
        // ... which basically defines the callbacks to be executed when it is resolved (ie ready)
        ContactsAPI.getAll().then(
            contacts => this.setState({

                // please note that normally `setState` expects something like `contacts: contacts`
                // however, a feature of ES6 allows the value to be provided directly 
                // ... as long as it is the same as the key name
                contacts

            })
        );
    }


    /* 
     * please note that this method will only be executing setState, not returning anything 
     */
    removeContact = contact => {

        // remove contact from local state
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
        }));

        // now also it from the database
        ContactsAPI.remove(contact);

    };


    render() {
        return (
            <div>
                {this.state.screen === 'list' && (
                    <ListContacts
                        allContacts={this.state.contacts}
                        onContactDelete={this.removeContact}
                    />
                )}

                {this.state.screen === 'create' && (
                    <CreateContact />
                )}
            </div>
        );
    }
}



export default App;
