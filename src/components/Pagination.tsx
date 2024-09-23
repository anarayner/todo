import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage }) => {
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return <MUIPagination count={10} page={currentPage} onChange={handleChange} />;
};

export default Pagination;
