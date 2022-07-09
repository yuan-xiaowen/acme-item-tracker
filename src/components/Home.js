import React from 'react'
import { connect } from 'react-redux'

const Home = ({users,things})=>{
  let highRanking = -100
  const topRanked = []
  for(let i = 0;i < things.length;i++){
    if(things[i].ranking>highRanking){
      highRanking = things[i].ranking
    }
  }
  for(let i = 0;i < things.length;i++){
    if(things[i].ranking===highRanking){
      topRanked.push(things[i].name)
    }
  }
  return (
    <div>
        <h1>Home Page</h1>
        <p>
            Acme Item Tracker has {users.length} users and {things.length} things.
        </p>
        <h2> Top Ranked</h2>
          <ul>
            {
              topRanked.map((element)=>{
                return(
                  <li key={element}>
                    {element}
                  </li>
                )
              })
            }
          </ul>
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