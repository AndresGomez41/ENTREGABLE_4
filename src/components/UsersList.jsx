import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersList = ({users, deleteUser, getUserSelected}) => {
 
    return (
        <ul>
            {users.map( user => 
                <li key={user.id}>
                    <div>
                        <h2>{user.first_name} {user.last_name}</h2>
                        <div>{user.email}</div>
                        <div>{user.birthday}</div>
                    </div>
                    <div className='btn-list-box'>
                        <button onClick={ () => deleteUser(user.id)}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <button onClick={ () => getUserSelected(user.id)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default UsersList;