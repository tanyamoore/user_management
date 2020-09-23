import React, { useState, useEffect } from 'react';
import { addUserOnServer, getUsers } from './api/users';
import './App.css';
import { Input } from './components/Input';
import { Pagination } from './components/Pagination';
import { UserCard } from './components/UserCard';


function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;    
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  console.log(currentUsers)

  const paginate = (num) => { 
    setCurrentPage(num);    
  } 

  const validate = (e, cache) => {
    if (e.target.id === "phone" && e.target.value.length !== 10 && !/0[0-9]{9}/.test(e.target.value)) {
      e.target.labels[0].textContent = "This field must contain 10 symbols and start with 0";
      e.target.labels[0].style.color = "red";
      e.target.style.borderColor = "red"
    } else if (e.target.id === "email" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(e.target.value)) {
      e.target.labels[0].textContent = "Please, enter correct email. Example: email@gmail.com";
      e.target.labels[0].style.color = "red";
      e.target.style.borderColor = "red"
    } else if ((e.target.id === "name" && e.target.value.length === 60)
      || (e.target.id === "surname" && e.target.value.length === 60 )
      || (e.target.value.length < 3 && e.target.id === "name")
      || (e.target.value.length < 3 && e.target.id === "surname")) {
      console.dir(e.target)    
      e.target.labels[0].textContent = "This field must contain more than 3, and less than 60 symbols";
      e.target.labels[0].style.color = "red";
      e.target.style.borderColor = "red"
    } else {
      e.target.labels[0].textContent = `Please, enter your ${e.target.id}:`;
      e.target.labels[0].style.color = "";
      e.target.style.borderColor = "";
      setUser({
        ...cache, 
        isValid: {
          ...cache.isValid,
          [`${[e.target.id]}`]: true,
        },
      });
    }
  }

  const handleChange = (e) => {  
    let cache = {
      id: users.length+1+'',
      ...user,
      [e.target.id]: `${e.target.value}`,
      createdAt: new Date().toJSON(),
      isValid: {
        ...user.isValid,
        [`${[e.target.id]}`]: false
      } 
    }
    setUser(cache);   

    validate(e, cache)
  }

  const isValid = () => (
    user.isValid    
    ? Object.values(user.isValid).length !== 5 
    ? true 
    : !Object.values(user.isValid).every(val => val === true)
    : true
  )

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      setUsers(response);
    }
    fetchData(); 
  }, []); 

  const deleteUser = (id) => {
    const conf = window.confirm(`Are you sure to delete this User?`);
    if(conf) {
      const cache = users.filter(user => user.id !== id);
      setUsers(cache);
      const url = `https://5f65f8ed43662800168e717f.mockapi.io/api/users/${id}`;
      const options = {
        method: 'DELETE',
      };

      return fetch(url, options);
    };
  };

  return (
    <div className="App">     
      <form className="form">    
        <Input 
          id={'name'}
          handleChange={handleChange}
          type="text"
          user={user}
          length={'60'}
        />
        <Input 
          id={'surname'}
          handleChange={handleChange}
          type="text"
          user={user}
          length={'60'}
        />    
        <Input 
          type={"date"} 
          id={"birth"} 
          handleChange={handleChange}
          user={user}
        />
        <Input 
          type={"tel"}
          id={"phone"} 
          length={"10"}
          handleChange={handleChange}
          user={user}        
        />
        <Input 
          type={"email"}
          id={"email"}
          handleChange={handleChange}
          user={user} 
        />
        <button 
          id="btn"
          className="btn waves-effect waves-light" 
          type="submit" 
          name="action"
          disabled={isValid()}
          onClick={(e) => {
            e.preventDefault();
              setUsers([...users, user]);
              setUser({
                name: '',
                surname: '',
                phone: '',
                email: '',
                birth: '',
              });
              addUserOnServer(user);
            }            
          }
        >
          Add User
          <i class="material-icons right">send</i>
        </button>
      </form>
      <Pagination 
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
      <UserCard 
        users={currentUsers}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
