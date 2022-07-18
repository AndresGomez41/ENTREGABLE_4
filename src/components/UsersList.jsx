import axios from 'axios';
import React, { useEffect, useState } from 'react';




const UsersList = ({users, getUsers, getUserSelected}) => {

    const deleteUser = id => {      
        alert('deleting user')
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then( () => getUsers() )
            .catch( e => console.error(e.response))
    }

   

    return (
        <ul>
            {users.map( user => 
                <li key={user.id}>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <div>{user.email}</div>
                    <div>{user.birthday}</div>
                    <div className='btn-list-box'>
                        <button onClick={ () => deleteUser(user.id)}>delete</button>
                        <button onClick={ () => getUserSelected(user.id)}>Update</button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default UsersList;