import { useState } from "react";
import {LiaAngleLeftSolid, LiaAngleRightSolid} from "react-icons/lia";

export function ImageCarousel({ images }) {
    const [imageIndex, setImageIndex] = useState(0);

    if (!images || !Array.isArray(images) || images.length === 0) {
        return <p>No images available</p>;
    }

    const handleNext = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-[580px] h-[389px]">
            <img
                key={images[imageIndex]._id || imageIndex}
                src={images[imageIndex].imgURL}
                alt={images[imageIndex].imgAlt || "Cabin image"}
                className="w-[580px] h-[389px] object-cover rounded-[12px]"
            />
            <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-600"
            >
                <LiaAngleLeftSolid />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-600"
            >
                <LiaAngleRightSolid />
            </button>

            <div className={"w-full flex gap-[8px] pb-[8px] pt-[8px]"}>
                {images.map((image, index)=> (
                    <button
                        key={image._id || index}
                        onClick={() => setImageIndex(index)}
                        className="focus:outline-none"
                    >
                        <img
                            src={image.imgURL}
                            alt={image.imgAlt || "Thumbnail"}
                            className={`h-[50px] w-[75px] object-cover rounded-[12px] ${
                                index === imageIndex ? "scale-105 border-2 border-yellow-300" : "border-2 border-transparent"
                            }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}