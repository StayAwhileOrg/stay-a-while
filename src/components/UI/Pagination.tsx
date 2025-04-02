import { ArrowLeft, ArrowRight } from "lucide-react";

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
            <ArrowLeft
                onClick={handlePrev}
                className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : "text-black"}`}
                size={24}
            />

            <span className="flex items-center">
                Page {currentPage} of {totalPages}
            </span>

            <ArrowRight
                onClick={handleNext}
                className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : "text-black"}`}
                size={24}
            />
        </div>
    );
}
