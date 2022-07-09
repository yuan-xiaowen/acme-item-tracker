import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import ThingButton from './ThingButton'

const Things = ({things,deleteThing,rankingUp,rankingDown,users,changeOwner})=>{
  return (
    <div>
        <h1>Things Page({things.length})</h1>
      <ul>
        {
            things.map((thing)=>{
              return(
                <li key={thing.id} className='thing'>
                  <div>
                  {thing.name}
                  <button onClick={()=>deleteThing(thing)}>x</button>
                  </div>
                  <div>
                  ranking:{thing.ranking}
                  <button onClick={()=>rankingUp(thing)}>+</button>
                  <button onClick={()=>rankingDown(thing)}>-</button>
                  </div>
                  <div>
                    owner:{
                      users.map(user=>user.id===thing.userId?user.name:'')
                    }
                  </div>
                  <div>
                  <select  onChange={(ev)=>changeOwner(thing,ev.target.value)}>
                    <option value='0'>choose</option>
                    {
                      users.map((user)=>{
                        return(
                          <option key={user.id} value={user.id}>{user.name}</option>
                        )
                      })
                    }
                   </select>
                   </div>
                </li>
              )
            })
        }
      </ul>
      <ThingButton />
    </div>
  )
}

const mapDispatchToProps = (dispatch)=>{
  return{
    deleteThing: async(thing)=>{
      await axios.delete(`/api/things/${thing.id}`)
      dispatch({type:'DELETE_THING',thing})
    },
    rankingUp:async(thing)=>{
      await axios.get(`/api/things/rankingup/${thing.id}`)
      const response = await axios.get('/api/things')
      dispatch({type:'RANKING_UP',things:response.data})
    },
    rankingDown:async(thing)=>{
      await axios.get(`/api/things/rankingdown/${thing.id}`)
      const response = await axios.get('/api/things')
      dispatch({type:'RANKING_DOWN',things:response.data})
    },
    changeOwner:async(thing,id)=>{
      if (id*1===0){
        return
      }
      thing = {...thing,userId:id*1}
      await axios.post(`/api/things/${thing.id}`,thing)
      const response = await axios.get('/api/things')
      dispatch({type:'CHANGE_OWNER',things:response.data})
    }
  }
}

const mapStateToProps = (state)=>{
    return {
        things:state.things,
        users:state.users
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Things)

