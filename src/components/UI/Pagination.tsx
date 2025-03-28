type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-center gap-4 m-4 pt-4">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#2D4B48] text-white rounded-lg hover:bg-[#2D4B48] disabled:bg-gray-400 cursor-pointer"
            >
                Prev
            </button>

            <span className='flex items-center'>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#2D4B48] text-white rounded-lg hover:bg-[#2D4B48] disabled:bg-gray-400 cursor-pointer"
            >
                Next
            </button>
        </div>
    );
}