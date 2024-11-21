import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center mt-4">
            <button
                id='before'
                className="px-4 py-2 mx-1 bg-primary text-white rounded hover:bg-primary-dark"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <MdNavigateBefore className="transition-transform duration-300 transform hover:-translate-x-1" />
            </button>
            <span className="px-4 py-2 mx-1">
                Página {currentPage} de {totalPages}
            </span>
            <button
                id='next'
                className="px-4 py-2 mx-1 bg-primary text-white rounded hover:bg-primary-dark"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <MdNavigateNext className="transition-transform duration-300 transform hover:translate-x-1" />
            </button>
        </div>
    );
};

export default Pagination;