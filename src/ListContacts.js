import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



class ListContacts extends Component {

    // this is how you add PropTypes to a class component
    // please note that unlike state which is different for each instance
    // ... propTypes is a definition that is per class, not per instance
    static propTypes = {
        allContacts: PropTypes.array.isRequired,
        onContactDelete: PropTypes.func.isRequired
    };

    // state to be tied with the search field
    state = {
        query: ''
    };


    /*
     * query event handler definition
     * will be used by the 'controlled input' on every change
     * ... to update the state with a new value
     */
    updateQuery = query => {
        this.setState(() => ({

            // removes whitespace from both ENDS of a string
            // ... this will also now be reflected in the field UI
            query: query.trim()
        }));
    };


    /*
     * clear query simply reusing updateQuery
     */
    clearQuery = () => {
        this.updateQuery('');
    };


    render() {

        // destructure state and props for easier access
        const { query } = this.state;
        const { allContacts, onContactDelete } = this.props;

        // an array of all the filtered contacts
        // ... resulting from a filter checking if contacts include the query characters
        let filteredContacts = allContacts.filter(contact => (
            contact.name.toLowerCase().includes(query.toLowerCase())
        ));

        const visibleContacts = (query === '' ? allContacts : filteredContacts);


        return (
            <div className='list-contacts'>

                {/* search bar */}
                <div className='list-contacts-top'>
                    <input
                        type='text'
                        className='search-contacts'
                        placeholder='Search Contacts'

                        // this is what turns this component into a "controlled component"
                        // it's basically when form input is processed by react and 
                        // ... the input display is simply linked to show the state value
                        // ... pls nt `event.target` is a ref to the DOM object onto which the event was dispatched
                        value={query}
                        onChange={event => this.updateQuery(event.target.value)}
                    />

                    <Link to="/create" className='add-contact'>
                        Add Contact
                    </Link>
                </div>


                {/* filter meta data */}
                {visibleContacts.length !== allContacts.length && (
                    <div className="showing-contacts">
                        <span>
                            Now showing {visibleContacts.length} of {allContacts.length}
                        </span> /
                        <button onClick={() => this.updateQuery('')}>
                            Show all
                        </button>
                    </div>
                )}


                {/* contacts display  */}
                <ol className='contact-list'>
                    {visibleContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item' >
                            {
                                // generally when images are part of the actual content, use <img>
                                // but when images are not part of the main content, simply use background-image
                                // <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}></div>

                                // since the avatar is actually part of the content here
                                // ... it makes sense to use 'img', as opposed to 'background-image'
                            }
                            <div className='contact-avatar'>
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
                                <p>{contact.handle}</p>
                            </div>

                            <button
                                className='contact-remove'
                                onClick={

                                    // please note that it is not possible to call functions directly here, in react
                                    // rather it is important to provide a function definition instead
                                    () => onContactDelete(contact)
                                }
                            />
                        </li>
                    ))}
                </ol>

            </div >


        )
    }
}



// // props validation definition
// // this is how you add PropTypes to a functional component
// ListContacts.propTypes = {
//     allContacts: PropTypes.array.isRequired,
//     onContactDelete: PropTypes.func.isRequired
// }



export default ListContacts;