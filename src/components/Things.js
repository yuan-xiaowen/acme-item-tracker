import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import ThingButton from './ThingButton'

const Things = ({things,deleteThing,rankingUp,rankingDown,changeOwner})=>{
    console.log(things)
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
                    owner:{thing.userId}
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
    // changeOwner:async(thing)=>{
    //   await axios.post(`/api/things/${thing.id}`)
    //   const response = await axios.get('/api/things')
    //   dispatch({type:'CHANGE_OWNER',things:response.data})
    // }
  }
}

const mapStateToProps = (state)=>{
    return {
        things:state.things
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Things)

 //<div>
//                     <label>changOwner</label>
//                     <input name ='id'/>
//                     <button onClick={ changeOwner(thing) }>submit</button>
//                   </div>