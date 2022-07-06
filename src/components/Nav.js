import React from 'react'
import { connect } from 'react-redux'

const Nav = (view,users,things)=>{
  return (
    <div>
    <nav>
        <a href='#' className={view==='' ? 'selected':''}>HOME</a>
        <a href='#users' className={view==='users' ? 'selected':''}>USERS</a>
        <a href='#things' className={view==='things' ? 'selected':''}>THINGS</a>
    </nav>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
    return state;
  };
  
export default connect(mapStateToProps)(Nav);