export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    

    return (
        <div className="pagination">
            <button
                className="prev-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`number-btn ${number === currentPage ? "active" : ""}`}
                    disabled={number=== currentPage}
                >
                    {number}
                </button>
            ))}
            <button
                className="next-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"} 
            </button>
        </div>
    );
}