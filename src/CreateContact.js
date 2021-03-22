import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serialize from 'form-serialize';



class CreateContact extends Component {

    handleSubmit = event => {
        event.preventDefault();
        
        // `form-serialize` allows data to be transformed into a format that can be
        // ... transmitted (ie query string), or stored
        // [https://www.npmjs.com/package/form-serialize]
        const obj = serialize(event.target, {
            
            // `hash` for output as a js object (instead of the default url encoded)
            // obj -> { foo: 'bar' } (instead of str -> "foo=bar")
            hash: true
        });

        // `onCreateContact` is yet to be created
        if (this.props.onCreateContact) {
            this.props.onCreateContact(obj);
        }
    }

    render() {
        return (
            <div>
                <Link to='/' className="close-create-contact">
                    Close
                </Link>

                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput
                        name='avatarURL'
                        maxHeight={64}
                        className='create-contact-avatar-input'
                    />
                    <div className='create-contact-details'>
                        <input type='text' name='name' placeholder='Name' />
                        <input type='text' name='handle' placeholder='Handle' />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        );
    }
}



export default CreateContact;