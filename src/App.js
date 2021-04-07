import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

import { BrowserRouter, Route } from 'react-router-dom';



class App extends Component {

    state = {
        contacts: []
    };


    /*
     * retrieves the contacts data, and sets it to our local state as a result
     */
    componentDidMount = () => {

        // `.getAll()` returns a Promise object (since ES6), containing the data
        // ... which runs specific callbacks, specified using `.then(...)`, when ready
        ContactsAPI.getAll().then(
            contacts => this.setState({

                // please note that normally `setState` expects something like `contacts: contacts`
                // however, a feature of ES6 allows the value to be provided directly 
                // ... as long as it is the same as the key name
                contacts
            })
        );
    };


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


    createContact = contact => {

        // add contact in backend using API
        ContactsAPI.create(contact).then(contact => {

            // then also update local state with new contact
            this.setState(currentState => ({

                contacts: [
                    ...currentState.contacts,
                    contact
                ]

                // please note that using `push` would only return the array length
                // whereas `concat` doesn't modify the calling array, but returns a new one
                // contacts: currentState.contacts.concat([contact])
            }));
        });
    };


    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* ---- List Contacts Route ---- */}
                    <Route exact path='/' render={() => (
                        <ListContacts
                            allContacts={this.state.contacts}
                            onContactDelete={this.removeContact}
                        />
                    )} />

                    {/* ---- Create Contact Route ---- */}
                    {/* each time a component is rendered with React Router v4,
                      * ... it is passed three components, `location`, `match`, `history`
                      * ... in this case we will use history to allow returning to listing after create
                      */}
                    <Route path='/create' render={({ history }) => (
                        <CreateContact

                            // normally we would have just done 
                            // ... onCreateContact={this.createContact}
                            // ... however, in this case we would like to make use of `history`
                            // 
                            // please note that the following is just a function definition
                            // ... and so `contact` will be generated when the button is pressed
                            // ... and essentially passed in as an argument
                            onCreateContact={contact => {
                                this.createContact(contact);
                                history.push('/');
                            }}
                        />
                    )} />
                </div>
            </BrowserRouter>
        );
    }
}



export default App;
