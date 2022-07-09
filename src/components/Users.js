import React from 'react'
import { connect } from 'react-redux'
import UserButton from './UserButton'
import axios from 'axios'


const Users = ({users,deleteUser,things})=>{

  return (
    <div>
        <h1>Users Page({users.length})</h1>
        <ul>
         {
            users.map((user)=>{
                return(
                <li key={user.id}>
                    {user.name}
                       {
                        things.map( thing =>{thing.userId===user.id ? 'owns:'+thing.name:''})
                       }     
                    <button onClick={ ()=>deleteUser(user) }>x</button>
                    </li>
                )
            })
         }
        </ul>
      <UserButton />
    </div>
  )
}

const mapDispatchToProps = (dispatch)=> {
    return {
      deleteUser: async(user)=> {
        await axios.delete(`/api/users/${user.id}`)
        dispatch({ type: 'DELETE_USER', user })
      }
    };
  }

const mapStateToProps = (state)=>{
    return {
        users:state.users,
        things:state.things
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users)