import React, { Component } from 'react';
import PropTypes from 'prop-types';



class ListContacts extends Component {

    // this is how you add PropTypes to a class component
    // please note that unlike state which is different for each instance
    // ... propTypes is a definition that is per class, not per instance
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onContactDelete: PropTypes.func.isRequired
    }

    // state to be tied with the search field
    state = {
        query: ''
    }


    // query event handler definition
    updateQuery = query => {
        this.setState(() => ({

            // removes whitespace from both ENDS of a string
            // ... this will also now be reflected in the field UI
            query: query.trim()
        }))
    }


    render() {

        // destructure state and props for easier access
        const { query } = this.state;
        const { contacts, onContactDelete } = this.props;

        // an array of all the filtered contacts
        // ... created by ensuring each contact fulfils the filter requirement
        // ... in this case, simply checking if it includes the query
        let filteredContacts = contacts.filter(contact => (
            contact.name.toLowerCase().includes(query.toLowerCase())
        ))

        const queriedContacts = (query === '' ? contacts : filteredContacts)


        return (
            <div className='list-contacts'>

                <div className='list-contacts-top'>
                    <input
                        type='text'
                        className='search-contacts'
                        placeholder='Search Contacts'

                        // this is what turns this component into a "controlled component"
                        // it's basically when form 
                        value={query}
                        onChange={event => this.updateQuery(event.target.value)}
                    />
                </div>

                <ol className='contact-list'>
                    {queriedContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item' >
                            {
                                // generally when images are part of the actual content, use <img>
                                // but when images are not part of the main content, simply use background-image
                                // <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}></div>

                                // since the avatar is actually part of the content here
                                // ... it makes sense to use 'img', as opposed to 'background-image'
                            }
                            < div className='contact-avatar' >
                                <img
                                    src={contact.avatarURL}
                                    style={{ borderRadius: '50%' }}
                                    alt={contact.name}
                                    title={contact.name}
                                    height='100%'
                                    width='100%'
                                />
                            </div>

                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>@{contact.handle}</p>
                            </div>

                            <button
                                className='contact-remove'
                                onClick={

                                    // please note that it is not possible to call functions directly here, in react
                                    // rather it is important to provide a function definition instead
                                    () => onContactDelete(contact)
                                }
                            >
                                Remove
                    </button>
                        </li>
                    ))
                    }
                </ol>

            </div >


        )
    }
}



// // props validation definition
// // this is how you add PropTypes to a functional component
// ListContacts.propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onContactDelete: PropTypes.func.isRequired
// }



export default ListContacts;