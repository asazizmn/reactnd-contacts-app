import React, { Component } from 'react';
import PropTypes from 'prop-types';



class ListContacts extends Component {

    // this is how you add PropTypes to a class component
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onContactDelete: PropTypes.func.isRequired
    }


    render() {
        return (
            <ol className='contact-list'>
                {this.props.contacts.map(contact => (
                    <li key={contact.id} className='contact-list-item'>
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
                            <p>@{contact.handle}</p>
                        </div>

                        <button
                            className='contact-remove'
                            onClick={

                                // please note that it is not possible to call functions directly here, in react
                                // rather it is important to provide a function definition instead
                                () => this.props.onContactDelete(contact)
                            }
                        >
                            Remove
                    </button>
                    </li>
                ))}
            </ol>
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