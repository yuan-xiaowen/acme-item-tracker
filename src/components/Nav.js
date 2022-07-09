import React from 'react'
import { connect } from 'react-redux'

const Nav = (view)=>{
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

const mapStateToProps = (state) => {
    return state.view
  }
  
export default connect(mapStateToProps)(Nav)