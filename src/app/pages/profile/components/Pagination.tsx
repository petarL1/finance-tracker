import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './css/Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className={styles.pagination}>
    <button
      disabled={currentPage === 1}
      className={styles.pageButton}
      onClick={() => onPageChange(currentPage - 1)}>
      <FaArrowLeft />
    </button>
    {Array.from({ length: totalPages }, (_, idx) => (
      <button
        key={idx}
        className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.activePage : ''}`}
        onClick={() => onPageChange(idx + 1)}>
        {idx + 1}
      </button>
    ))}
    <button
      disabled={currentPage === totalPages}
      className={styles.pageButton}
      onClick={() => onPageChange(currentPage + 1)}>
      <FaArrowRight />
    </button>
  </div>
);

export default Pagination;
