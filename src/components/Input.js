import React from 'react';

export const Input = ({ id, type, handleChange, user, length }) => (
  <div className="input-field col s6">
    <input 
      className="fields" 
      type={type} 
      id={id}
      onChange={handleChange}
      value={user[`${id}`]}
      maxLength="60"
      onFocus={e => 
        e.target.labels[0].className = 'active'
      }
    />
    <label htmlFor={id}>Please, enter your {id}:</label> 
  </div>
)