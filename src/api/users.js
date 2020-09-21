export const getUsers = async() => {
  const response = await fetch("https://5f65f8ed43662800168e717f.mockapi.io/api/users?page=1&limit=10");
  const result = await response.json();
  return await result.data;
};