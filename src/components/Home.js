import React from 'react'
import { connect } from 'react-redux'

const Home = ({users,things})=>{
  console.log('@@@@@@@@@')
  console.log(things)
  let highRanking = -100
  let highName = 'hhhhhhh'
  //let highId = 0
  for(let i = 0;i<things.length;i++){
    console.log(things[i].ranking)
    if(things[i].ranking>highRanking){
      highRanking = things[i].ranking
      highName = things[i].name
     // highId = things[i].id
    }
  }
  return (
    <div>
        <h1>Home Page</h1>
        <p>
            Acme Item Tracker has {users.length} users and {things.length} things.
            The Highest Ranking is { highName }
        </p>
    </div>
  )
}

const mapSToP = (state)=>{
    return {
        users:state.users,
        things:state.things
    }
}

export default connect(mapSToP)(Home)