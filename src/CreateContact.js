import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize'


class CreateContact extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    console.log(values);
    this.props.createContact(values);
  }

  render(){
    return(
      <div>
        <Link to="/">Back</Link>
        <form className="create-contact-form" onSubmit={ e => this.handleSubmit(e)}>
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxWidth={64}
          />
          <div className="create-contact-details">
            <input placeholder="name" type="text" name="name"/>
            <input placeholder="email" type="text" name="email"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default CreateContact;
