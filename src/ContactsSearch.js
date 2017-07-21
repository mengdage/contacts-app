import React, { Component } from 'react';

class ContactsSearch extends Component {
  constructor(props) {
    super(props);
  }

  searchHandler(value) {
    this.props.searchHandler(value);
  }

  render() {
    const query = this.props.query;
    return (
      <form>
        <input type="text" value={query} onChange={(e)=>this.searchHandler(e.target.value)}/>
        <button className={query.length>0? '': 'hide'} type="button" onClick={()=>this.searchHandler('')}>X</button>
      </form>
        );
  }
}

export default ContactsSearch;
