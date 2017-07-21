import React, { Component } from 'react';
import logo from './logo.svg';
import * as ContactsAPI from './utils/ContactsAPI';
import ContactsList from './ContactsList';
import ContactsSearch from './ContactsSearch';
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

  render() {
    const query = this.state.query;
    return (
      <div className="contacts-app">
        <div className="contacts-app-head">
          <ContactsSearch query={query} searchHandler={(keyword) => this.searchContacts(keyword)}/>
          {/* <ContactAdd /> */}
        </div>
        <ContactsList query={query} contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
