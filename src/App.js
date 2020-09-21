import React, { useState, useEffect } from 'react';
import { getUsers } from './api/users';
import './App.css';


function App() {
const [users, setUsers] = useState([])
const [user, setUser] = useState({})
const [currentPage, setCurrentPage] = useState(1)
const [usersPerPage, setUsersPerPage] = useState(10)

const addUsers = () => {
  const url = 'https://5f65f8ed43662800168e717f.mockapi.io/api/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(users),
  };
  return fetch(url, options);    
};


const addUser = (e) => {
  let cache = {
    id: users.length+1,
    ...user,
    [e.target.id]: `${e.target.value}`,
    createdAt: new Date().toString(),
  }
  setUser(cache);
  console.log(JSON.stringify(users)) 
}


useEffect(() => {
  async function fetchData() {
    const response = await getUsers();
    setUsers(response)
  }
  fetchData();
  addUsers();   
}, []); 


const activeLabel = (e)=>{
  console.log(e.target.labels[0])
  e.target.labels[0].className = 'active'
}

const deleteUser = (id) => {
  const url = `https://5f65f8ed43662800168e717f.mockapi.io/api/users/${id}`;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options);
};


// const handleValidation = (event) => {
//   const { value, name } = event.target;
//   const errorName = `${name}Error`;
//   // eslint-disable-next-line max-len
//   const patternPhone = /(\+3[-_()\s]+|\+3\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})/;
//   const patternMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   let isValid;

//   switch (name) {
//     case 'name':
//       isValid = value.length < 60;
//       break;
//     case 'surname':
//       isValid = value.length < 60;
//       break;
//     case 'phone':
//       isValid = !patternPhone.test(value);
//       break;
//     case 'email':
//       isValid = !patternMail.test(value);
//       break;
//     default: isValid = false;
//   }

//   setUser({
//     validation: Object.values(user.errors)
//       .every(input => input === false),
//   })

//   setUser({
//     errors: {
//       ...user.errors,
//       [errorName]: isValid,
//     },
//   })
// }

console.log(users)

  return (
    <div className="App">          
      <form className="form">     
      <div class="input-field col s6">  
          <input  
            className="fields" 
            type="text" 
            id="name" 
            onChange={addUser}
            value={user.name}
            onFocus={activeLabel}
            //onBlur={handleValidation}
          />
          <label htmlFor="name">Please, enter your name:</label>      
        </div>  
        <div class="input-field col s6"> 
          <input 
            className="fields" 
            type="text" 
            id="surname" 
            onChange={addUser}
            value={user.surname}
            onFocus={activeLabel}
            //onBlur={handleValidation}
          />
          <label htmlFor="surname">Please, enter your surname:</label>        
        </div>
        <div class="input-field col s6"> 
          <input 
            className="fields" 
            type="date" 
            id="birth" 
            onChange={addUser}
            value={user.birth}
            onFocus={activeLabel}
            //onBlur={handleValidation}
          />
          <label htmlFor="birth">Please, enter your date of birth:</label>        
        </div>
        <div class="input-field col s6"> 
          <input 
            className="fields" 
            type="text" 
            id="phone" 
            onChange={addUser}
            value={user.phone}
            onFocus={activeLabel}
            //onBlur={handleValidation}
          />
          <label htmlFor="phone">Please, enter your phone:</label>        
        </div>
        <div class="input-field col s6"> 
          <input 
            className="fields" 
            type="text" 
            id="email" 
            onChange={addUser}
            value={user.email}
            onFocus={activeLabel}
            //onBlur={handleValidation}
          />
          <label htmlFor="email">Please, enter your email:</label>
        </div>
        <button 
          class="btn waves-effect waves-light" 
          type="submit" 
          name="action"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onClick={
            (e) => {
              e.preventDefault();
              setUsers([...users,user]);
              setUser({
                name: '',
                surname: '',
                phone: '',
                email: '',
                birth: '',
              });
            }
          }
        >
          Add User
          <i class="material-icons right">send</i>
        </button>
      </form>
      <div className="block">
        {users.map(user=>
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">{user.name} {user.surname}</span>
                  <p>{user.birth}</p>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.updatedAt || user.createdAt}</p>
                </div>
                <div class="card-action">
                <a class="waves-effect waves-light btn-small">Edit</a>
                <a class="waves-effect waves-light btn-small">
                  <button
                    onClick={deleteUser}
                  >Delete </button>
                                   
                </a>
                </div>
              </div>
            </div>
          </div> 
        )}
      </div>
    </div>
  );
}

export default App;
