import React, { useEffect, useState } from "react";

export const User = ({ user, deleteUser, updateUser }) => {
  const [changedUser, setChangedUser] = useState(user);

  useEffect(() => {
    setChangedUser(user) 
  },[user])

  const editUser = (e) => {
    console.log(changedUser)
    const cache = {
      ...changedUser,
      [e.target.id]: e.target.value, 
      isValid: {
        ...changedUser.isValid,
        [`${[e.target.id]}`]: true,
      },     
    }
    setChangedUser({
      ...cache,      
      updatedAt: new Date().toJSON(),
    })

    console.dir(e.target)
    
    if (e.target.id === "phone" && e.target.value.length !== 10 && !/0[0-9]{9}/.test(e.target.value)) {
      e.target.style.borderColor = "red"
    } else if (e.target.id === "email" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(e.target.value)) {
      e.target.style.borderColor = "red"
    } else if ((e.target.id === "name" && e.target.value.length === 60)
      || (e.target.id === "surname" && e.target.value.length === 60 )
      || (e.target.value.length < 3 && e.target.id === "name")
      || (e.target.value.length < 3 && e.target.id === "surname")) {
      e.target.style.borderColor = "red"
    } else {
      e.target.style.borderColor = "";
      setChangedUser({
        ...cache, 
        isValid: {
          ...cache.isValid,
          [`${[e.target.id]}`]: true,
        },
      });
    }
  }  
  
  console.log(user)
  
  return (  
    <div className="card">           
      <div className="card__content">
        <input 
          id="name"
          className="card__title" 
          value={changedUser.name} 
          onChange={editUser}
        />
        <input 
          id="surname"
          className="card__title" 
          value={changedUser.surname} 
          onChange={editUser}
        />
        <input 
          id="birth"
          className="card__input" 
          type="date" 
          value={changedUser.birth && changedUser.birth.slice(0,10)} 
          onChange={editUser}
        />
        <input 
          id="email"
          className="card__input" 
          value={changedUser.email} 
          onChange={editUser}
        />
        <input 
          className="card__input" 
          value={changedUser.phone} 
          onChange={editUser}
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
          onClick={()=>updateUser(changedUser)}
          disabled={() => (
            changedUser.isValid    
            ? Object.values(changedUser.isValid).length !== 5 
            ? true 
            : !Object.values(changedUser.isValid).every(val => val === true)
            : true
          )}
        >
          Update                                   
        </button>
      </div>
    </div> 
  )
}