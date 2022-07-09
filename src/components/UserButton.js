import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {faker} from '@faker-js/faker'

const UserButton = ({ createUser })=> {
  return (
    <div>
      <button onClick={ createUser }>Add A New User</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createUser: async()=> {
      const response = await axios.post('/api/users', { name: faker.name.firstName()});
      const user = response.data;
      dispatch({ type: 'CREATE_USER', user });
    }
  };
}

export default connect(null, mapDispatchToProps)(UserButton);