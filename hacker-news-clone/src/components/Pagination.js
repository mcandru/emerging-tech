import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, nbPages, onPageChange }) {
  const maxPagesToShow = 10;
  const pages = [];
  
  let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(nbPages - 1, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 0 && (
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>
      )}
      
      {startPage > 0 && (
        <>
          <button 
            onClick={() => onPageChange(0)}
            className="pagination-btn"
          >
            1
          </button>
          {startPage > 1 && <span className="pagination-ellipsis">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
        >
          {page + 1}
        </button>
      ))}
      
      {endPage < nbPages - 1 && (
        <>
          {endPage < nbPages - 2 && <span className="pagination-ellipsis">...</span>}
          <button 
            onClick={() => onPageChange(nbPages - 1)}
            className="pagination-btn"
          >
            {nbPages}
          </button>
        </>
      )}
      
      {currentPage < nbPages - 1 && (
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
