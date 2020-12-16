import React, { Component } from 'react';



class ListContacts extends Component {
    render() {

        // DEBUG !!! ////////////////////
        // console.log('Props', this.props);

        const contacts = this.props.contacts;

        return (
            <ol className='contact-list'>
                {contacts.map(contact => (
                    <li key={contact.id}>{contact.name}</li>
                ))}
            </ol>
        )
    }
}



export default ListContacts;