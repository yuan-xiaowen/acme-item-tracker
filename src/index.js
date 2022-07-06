import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Nav from './components/Nav'
import Users from './components/Users'
import Things from './components/Things'
import Home from './components/Home'
import store from './store'
import { Provider, connect } from 'react-redux'

const root = createRoot(document.querySelector('#root'))

class _App extends Component{
  async componentDidMount(){
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1))
    })
    try {
      this.props.loadData()
    }
    catch(ex){
      console.log(ex)
    }
  }
  render(){
    const { view } = this.props
    return (
      <div>
        <Nav />
        {
          view === '' ? <Home /> : null

        }
        {
          view === 'users' ? <Users /> : null

        }
        {
          view === 'things' ? <Things /> : null

        }
      </div>
    )
  }
}


const mapDispatch = (dispatch)=> {
  return {
    setView: (view)=> {
      dispatch({ type: 'SET_VIEW', view })
    },
    loadData: async()=> {
      const response1 = await axios.get('/api/users')
      const response2 = await axios.get('/api/things')
      dispatch({
        type: 'SET_USERS',
        users: response1.data
      });
      dispatch({
        type: 'SET_THINGS',
        things: response2.data
      })
    }
  }
}
const mapStateToProps = (state) => {
  return {
    view: state.view
  }
}

const App = connect(mapStateToProps, mapDispatch)(_App)


root.render(<Provider store={ store }><App /></Provider>);


// const root = document.querySelector('#root')
// ReactDOM.render(
//     <App />,
//     root
// )