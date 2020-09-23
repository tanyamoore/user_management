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
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <li key={num}>
            <button
              type="button"
              className="nav__button"
              onClick={()=>{
                paginate(num)
              }}
            >
              {num}
            </button>
          </li>
        ))}
        
      </ul>
    </nav>
  )
}