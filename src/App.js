import React, { Component } from 'react';
import logo from './logo.svg';
import * as ContactsAPI from './utils/ContactsAPI';
import ContactsList from './ContactsList';
import ContactsSearch from './ContactsSearch';
import CreateContact from './CreateContact';
import { Link, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      query: ''
    };
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(data => this.setState({
        contacts: data
      }));
  }

  searchContacts(kw) {
    this.setState({
      query: kw
    });
  }

  createContact(contact) {
    ContactsAPI.create(contact)
      .then(res=>this.setState({
        contacts: this.state.contacts.concat([res])
      }));
  }

  removeContact(contact) {
    const id = contact.id;
    ContactsAPI.remove(contact);
    this.setState({
      contacts: this.state.contacts.filter(c=>c.id!==id)
    });
  }

  render() {
    const query = this.state.query;
    return (
      <div className="contacts-app">
        <Route exact path="/" render={()=>(
          <div>
            <div className="contacts-app-head">
              <ContactsSearch
                query={query}
                searchHandler={(keyword) => this.searchContacts(keyword)}/>
              <Link to="/create" className="add-contact">Add</Link>
            </div>
            <ContactsList
              removeContact={(c)=>this.removeContact(c)}
              query={query}
              contacts={this.state.contacts} />
          </div>
        ) } />

        <Route path="/create" render = {
          ({history}) => (
            <CreateContact createContact={(contact)=>{
              this.createContact(contact);
              history.push('/');
            }}/>
          )
        } />

      </div>
    );
  }
}

export default App;
