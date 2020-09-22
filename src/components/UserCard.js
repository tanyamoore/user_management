import React from "react";
import { User } from "./User";

export const UserCard = ({ users, updateUser, deleteUser }) => (
  <div className="block">
    {users.map(user=>
      <User 
        user={user}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
    )}
  </div>
);
