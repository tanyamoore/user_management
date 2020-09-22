export const getUsers = async() => {
  const response = await fetch("https://5f65f8ed43662800168e717f.mockapi.io/api/users");
  const result = await response.json();
  if (!response.ok) {
    alert("Sorry, but server is broken:(");
    return [];
  }
  return await result.data;
};

export const addUserOnServer = (user) => {
  const url = 'https://5f65f8ed43662800168e717f.mockapi.io/api/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };
  return fetch(url, options);    
};

export const updateUser = (changedUser) => {
  const conf = window.confirm(`Are you sure to change User data?`);
  if(conf) {
    const url = `https://5f65f8ed43662800168e717f.mockapi.io/api/users/${changedUser.id}`;
    const options = {
      method: 'PUT',
      body: JSON.stringify(changedUser),
    };

    return fetch(url, options);
  }
}