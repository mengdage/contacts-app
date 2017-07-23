import React, {Component} from 'react';

// this.props.contacts
class ContactsList extends Component {

  render() {
    const query = this.props.query;

    // contacts is filtered by query
    let contacts;
    if(query) {
      const matcher = new RegExp(query, 'i');
      contacts = this.props.contacts.filter((contact)=>matcher.test(contact.name));
    } else {
      contacts = this.props.contacts;
    }
    // create contact items, an array of <li>s
    const contactItems = contacts.map((contact, idx) => (
      <li key={idx} className="contact-list-item">
        <img className="contact-avatar" src={contact.avatarURL} alt={contact.name}/>
        <div className="contact-details">
          <p>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
        <div onClick={()=>this.props.removeContact(contact)}
        className="contact-remove">X</div>
      </li>
    ));

    return(
      <ol className="contacts-list">
        {contactItems}
      </ol>
    );
  }
}

export default ContactsList;
