import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {faker} from '@faker-js/faker'

const ThingButton = ({ createThing })=> {
  return (
    <div>
      <button onClick={ createThing }>Add A New Thing</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createThing: async()=> {
      const response = await axios.post('/api/things', { name:faker.name.lastName()});
      const thing = response.data;
      dispatch({ type: 'CREATE_THING', thing });
    }
  };
}

export default connect(null, mapDispatchToProps)(ThingButton);