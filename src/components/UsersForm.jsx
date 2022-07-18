import React, { useEffect, useState } from "react";
import axios from 'axios'

const UsersForm = ({getUsers, userSelected, resetUserSelected}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(userSelected !== null){
        setFirstName(userSelected.first_name)
        setLastName(userSelected.last_name)
        setEmail(userSelected.email)
        setBirthday(userSelected.birthday)
        setPassword(userSelected.password)
    }
  },[userSelected])

  const submit = e => {

    e.preventDefault()

    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      birthday,
      password,
    };

    if( userSelected === null){
        axios.post(`https://users-crud1.herokuapp.com/users/`, user)
            .then(() => {
                getUsers()
                reset()
            })
            .catch( e => console.error(e.response))
    }else if( userSelected !== null){
        axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
            .then(() => {
                getUsers()
                resetAll()
        })
        .catch( e => console.error(e.response))
    }
    
    

  };

  const resetAll = () => {
    reset()
    resetUserSelected()
  }

  const reset = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setBirthday("")
    setPassword("")
  }



  return (
    <form onSubmit={submit}>
      
      <label htmlFor="firstName"> First Name </label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName"> Last Name </label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

      <label htmlFor="email"> email </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

    <label htmlFor="birthday"> Birthday </label>
      <input
        type="date"
        id="birthday"
        value={birthday}
        onChange={e => setBirthday(e.target.value)}
      />

        <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button>{userSelected === null ? 'Submit' : 'Update'}</button>
      <button type="button" onClick={ () => resetAll()}> cancel </button>
    </form>
  );
};

export default UsersForm;
