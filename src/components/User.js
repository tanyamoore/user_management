import React, { useState } from "react";

export const User = ({ user, setUsers, users }) => {

  const [changedUser, setChangedUser] = useState(user)

  const changeUser = (e) => {
    const cache = {
      ...changeUser,
      [e.target.id]: e.target.value,      
    }
    setChangedUser(cache)
  }

  const updateUser = () => {
    const url = `https://5f65f8ed43662800168e717f.mockapi.io/api/users/${user.id}`;
    changedUser.updatedAt = new Date().toJSON();
    const options = {
      method: 'PUT',
      body: JSON.stringify(changedUser),
    };

    return fetch(url, options);
  }

  const deleteUser = (id) => {
    const cache = users.filter(user => user.id != id)
    setUsers(cache)
    const url = `https://5f65f8ed43662800168e717f.mockapi.io/api/users/${id}`;
    const options = {
      method: 'DELETE',
    };

    return fetch(url, options);
  };
  
  return (  
    <div className="card">           
      <div className="card__content">
        <input 
          id="name"
          className="card__title" 
          value={changedUser.name} 
          onChange={changeUser}
        />
        <input 
          id="surname="
          className="card__title" 
          value={changedUser.surname} 
          onChange={changeUser}
        />
        <input 
          id="birth"
          className="card__input" 
          type="date" 
          value={changedUser.birth} 
          onChange={changeUser}
        />
        <input 
          id="email"
          className="card__input" 
          value={changedUser.email} 
          onChange={changeUser}
        />
        <input 
          className="card__input" 
          value={changedUser.phone} 
          onChange={changeUser}
          id="phone"
        />
        <input 
          className="card__input" 
          value={changedUser.updatedAt || changedUser.createdAt} 
        />
      </div>
      <div class="card__action">
        <button 
          type="button" 
          className="card__button"
          onClick={()=>deleteUser(user.id)}
        >
          Delete                                    
        </button>
        <button 
          type="button" 
          className="card__button"
          onClick={updateUser}
        >
          Update                                   
        </button>
      </div>
    </div> 
  )
}