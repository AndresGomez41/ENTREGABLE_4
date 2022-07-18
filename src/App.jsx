import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import axios from 'axios'

function App() {  

  const [ users, setUsers ] = useState([])
  const [ userSelected, setUserSelected] = useState(null)

  useEffect( () => {
      axios.get(`https://users-crud1.herokuapp.com/users/`)
          .then(res => setUsers(res.data))
  },[])

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
    .then(res => setUsers(res.data))
  }

  const getUserSelected = id => {
    console.log('user id en funcion get user', id)
    alert('updating user')
    axios.get(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(res => setUserSelected(res.data))
  }

  const resetUserSelected = () => {
    setUserSelected(null)
  }




  console.log(users)
  console.log('user selected',userSelected)

  return (
    <div className="App">
      <UsersForm getUsers={getUsers} userSelected={userSelected} resetUserSelected={resetUserSelected}/>
      <UsersList users={users} getUsers={getUsers} getUserSelected={getUserSelected}/>
    </div>
  )
}

export default App
