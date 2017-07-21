import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContact extends Component {
  render(){
    return(
      <div>
        <Link to="/">Back</Link>
        <div>Create contact </div>
      </div>
    )
  }

}

export default CreateContact;
