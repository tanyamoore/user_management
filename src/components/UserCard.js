import React from "react";
import { User } from "./User";

export const UserCard = ({ users, deleteUser }) => (
  <div className="block">
    {users.map(user=>
      <User 
        user={user}
        deleteUser={deleteUser}
      />
    )}
  </div>
);
