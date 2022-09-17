import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import axios from 'axios'

function App() {  

  const [ users, setUsers ] = useState([])
  const [ userSelected, setUserSelected] = useState(null)
  const [ modal , setModal ] = useState(false)
  const [ action, setAction] = useState("")

  useEffect( () => {
      getUsers()
  },[])

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
    .then(res => setUsers(res.data))
  }

  const deleteUser = id => {      
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then( () => {
          getUsers() 
          openModal('deleted')
        })
        .catch( e => console.error(e.response))        
  }

  const getUserSelected = id => {
    axios.get(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(res => setUserSelected(res.data))
  }

  const resetUserSelected = () => {
    setUserSelected(null)
  }

  const closeModal = () => {
    setModal(false)
  }

  const openModal = (action) => {
    setAction(`user successfully ${action}`)
    setModal(true)
  }

  return (
    <div className="App">
      <UsersForm 
        getUsers={getUsers} 
        userSelected={userSelected} 
        resetUserSelected={resetUserSelected}
        closeModal={closeModal}
        openModal={openModal}
        modal={modal}
      />
      <UsersList 
        users={users} 
        deleteUser={deleteUser}
        getUserSelected={getUserSelected} 
       />
       
      <div className={`modal ${modal ? "show" : "hidden"}`} onClick={closeModal}>
        <div className="modal-content">
          <p>{action}</p>
          <i class="fa-solid fa-check"></i>
        </div>
      </div>
    </div>
  )
}

export default App
