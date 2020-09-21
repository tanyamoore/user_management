import React, { useState, useEffect } from 'react';
import { getUsers } from './api/users';
import './App.css';
import { UserCard } from './components/UserCard';


function App() {
const [users, setUsers] = useState([])
const [user, setUser] = useState({})
const [currentPage, setCurrentPage] = useState(1)
const [usersPerPage, setUsersPerPage] = useState(10)

const addUserOnServer = (user) => {
  const url = 'https://5f65f8ed43662800168e717f.mockapi.io/api/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };
  return fetch(url, options);    
};


const handleChange = (e) => {  
  let cache = {
    id: users.length+1,
    ...user,
    [e.target.id]: `${e.target.value}`,
    createdAt: new Date().toJSON(),
    [`validation${[e.target.id]}`]: false,    
  }

  setUser(cache);   

  console.log(e.target.id, e.target.value.length)

  if (e.target.id === "phone" && e.target.value.length < 9 || e.target.id === "phone"  && e.target.value.length == 9 && !/0[0-9]{9}/.test(e.target.value)) {
    e.target.labels[0].textContent = "This field must contain 10 symbols and start with 0";
    e.target.labels[0].style.color = "red";
    e.target.style.borderColor = "red"
  } 

  else if (e.target.id === "email" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(e.target.value)) {
    e.target.labels[0].textContent = "Please, enter correct email. Example: email@gmail.com";
    e.target.labels[0].style.color = "red";
    e.target.style.borderColor = "red"
  }
  
  

  else if (e.target.id === "name" && e.target.value.length === 60
    || e.target.id === "surname" && e.target.value.length === 60 
    || e.target.value.length < 3 && e.target.id === "name"
    || e.target.value.length < 3 && e.target.id === "surname") {
    console.dir(e.target.style.borderColor = "red")
    e.target.labels[0].textContent = "This field must contain more than 3, and less than 60 symbols";
    e.target.labels[0].style.color = "red";
    e.target.style.borderColor = "red"
  } 
  else {
    e.target.labels[0].textContent = `Please, enter your ${e.target.id}:`;
    e.target.labels[0].style.color = "";
    e.target.style.borderColor = "";
    cache[`validation${[e.target.id]}`] = true;
  }
  
  if (user.validationemail === true && user.validationname === true 
    && user.validationphone === true && user.validationsurname === true
    && user.validationbirth === true) {    
    document.getElementById("btn").disabled = false;
  } 

  console.log(user)
}

useEffect(() => {
  document.getElementById("btn").disabled = true;
  async function fetchData() {
    const response = await getUsers();
    setUsers(response)
  }
  fetchData(); 
}, []); 


const activeLabel = (e)=>{
  e.target.labels[0].className = 'active'
}

  return (
    <div className="App">     
      <form className="form">    
        <div className="input-field col s6">  
          <input  
            maxlength="60" 
            className="fields" 
            type="text" 
            id="name" 
            onChange={handleChange}
            value={user.name}
            onFocus={activeLabel}
          />
          <label htmlFor="name">Please, enter your name:</label> 
        </div>  
        <div className="input-field col s6"> 
          <input 
            maxlength="60"
            className="fields" 
            type="text" 
            id="surname" 
            onChange={handleChange}
            value={user.surname}
            onFocus={activeLabel}
          />
          <label htmlFor="surname">Please, enter your surname:</label>        
        </div>
        <div className="input-field col s6"> 
          <input 
            className="fields" 
            type="date" 
            id="birth" 
            onChange={handleChange}
            value={user.birth}
            onFocus={activeLabel}
          />
          <label htmlFor="birth">Please, enter your date of birth:</label>        
        </div>
        <div class="input-field col s6"> 
          <input 
            className="fields" 
            type="tel"
            id="phone" 
            maxLength="10"
            value={user.phone}
            onChange={handleChange}
            onFocus={activeLabel}            
          />
          <label htmlFor="phone">Please, enter your phone:</label>        
        </div>
        <div className="input-field col s6"> 
          <input 
            className="fields" 
            type="email" 
            id="email" 
            onChange={handleChange}
            value={user.email}
            onFocus={activeLabel}
          />
          <label htmlFor="email">Please, enter your email:</label>
        </div>
        <button 
          id="btn"
          className="btn waves-effect waves-light" 
          type="submit" 
          name="action"
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
                addUserOnServer(user);
                document.getElementById("btn").disabled = true;
              }            
            }
        >
          Add User
          <i class="material-icons right">send</i>
        </button>
      </form>
      <UserCard 
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default App;
