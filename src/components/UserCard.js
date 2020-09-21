import React from "react";
import { User } from "./User";

export const UserCard = ({ users, setUsers }) => (
  <div className="block">
    {users.map(user=>
      <User 
        user={user}
        users={users}
        setUsers={setUsers}
      />
    )}
  </div>
);
