import React from 'react';

export const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers=[];
  for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav class="nav">
      <ul>
        {pageNumbers.map(num => (
          <li key={num}>
            <a 
              href="!#"
              onClick={()=>{
                paginate(num)
              }}
            >
              {num}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  )
}