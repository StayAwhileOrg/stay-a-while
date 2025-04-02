import { LiaStar, LiaStarHalf, LiaStarSolid } from 'react-icons/lia';
import { useState } from 'react';

interface ReviewsProps {
    rating: number;
    maxRating?: number;
    size?: number;
    className?: string;
    readOnly?: boolean;
    onRatingChange?: (rating: number) => void;
}

export function RatingComponent({
                                    rating,
                                    maxRating = 5,
                                    size = 20,
                                    className = '',
                                    readOnly = false,
                                    onRatingChange,
                                }: ReviewsProps) {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const clampedRating = Math.max(0, Math.min(maxRating, rating));

    const handleStarClick = (starIndex: number) => {
        if (readOnly || !onRatingChange) return;
        onRatingChange(starIndex + 1);
    };

    const handleStarHover = (starIndex: number) => {
        if (readOnly) return;
        setHoveredRating(starIndex + 1);
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHoveredRating(null);
    };

    const displayRating = hoveredRating !== null ? hoveredRating : clampedRating;
    const displayFullStars = Math.floor(displayRating);
    const displayHasHalfStar = displayRating % 1 >= 0.5;

    return (
        <div
            className={`flex items-center ${className}`}
            onMouseLeave={handleMouseLeave}
        >
            {Array.from({ length: maxRating }, (_, index) => {
                const isFull = index < displayFullStars;
                const isHalf = !isFull && index === displayFullStars && displayHasHalfStar;

                return (
                    <span
                        key={`star-${index}`}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleStarHover(index)}
                        className={readOnly ? '' : 'cursor-pointer'}
                    >
            {isFull ? (
                <LiaStarSolid
                    size={size}
                    className="text-[#2D4B48] fill-current"
                />
            ) : isHalf ? (
                <LiaStarHalf
                    size={size}
                    className="text-[#2D4B48]"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
            ) : (
                <LiaStar
                    size={size}
                    className="text-[#2D4B48]"
                />
            )}
          </span>
                );
            })}
        </div>
    );
}