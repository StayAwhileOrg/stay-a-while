import { useForm, useFieldArray } from "react-hook-form";
import { createCabin } from "../../hooks/api/post/postCabin";
import { useState } from "react";

interface CabinFormData {
    title: string;
    description: string;
    images: { imgURL: string; imgAlt: string }[];
    location: { street: string; city: string; postalCode: string; country: string };
    pricePerNight: number;
    facilities: {
        capacity: number;
        petsAllowed: boolean;
        smokingAllowed: boolean;
        electricity: boolean;
        water: boolean;
        wifi: boolean;
        jacuzzi: boolean;
        beds: number;
    };
}

export function CabinForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<CabinFormData>({
        defaultValues: {
            title: "",
            description: "",
            images: [{ imgURL: "", imgAlt: "" }],
            location: { street: "", city: "", postalCode: "", country: "" },
            pricePerNight: undefined,
            facilities: {
                capacity: undefined,
                petsAllowed: false,
                smokingAllowed: false,
                electricity: false,
                water: false,
                wifi: false,
                jacuzzi: false,
                beds: undefined,
            },
        },
    });

    const { fields, append, remove } = useFieldArray<CabinFormData, "images">({
        control,
        name: "images",
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: CabinFormData) => {
        setError(null);
        setSuccess(null);

        const payload = {
            ...data,
            pricePerNight: Number(data.pricePerNight),
            facilities: {
                ...data.facilities,
                capacity: Number(data.facilities.capacity),
                beds: Number(data.facilities.beds),
            },
        };

        try {
            await createCabin(payload); // No assignment
            setSuccess("Cabin created successfully!");
            reset();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("Failed to create cabin. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Title</h3>
                    <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="Cabin Title"
                        className="border p-2 rounded w-full"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Description</h3>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        placeholder="Cabin Description"
                        className="border p-2 rounded w-full h-24"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Images</h3>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`images.${index}.imgURL`, {
                                    required: "Image URL is required",
                                })}
                                placeholder="Image URL"
                                className="border p-2 rounded flex-1"
                            />
                            {errors.images?.[index]?.imgURL && (
                                <p className="text-red-500 text-sm">
                                    {errors.images[index].imgURL?.message}
                                </p>
                            )}
                            <input
                                {...register(`images.${index}.imgAlt`)}
                                placeholder="Alt text"
                                className="border p-2 rounded flex-1"
                            />
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ imgURL: "", imgAlt: "" })}
                        className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white"
                    >
                        Add Image
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <input
                        {...register("location.street", { required: "Street is required" })}
                        placeholder="Street"
                        className="border p-2 rounded w-full mb-2"
                    />
                    {errors.location?.street && (
                        <p className="text-red-500 text-sm">{errors.location.street.message}</p>
                    )}
                    <input
                        {...register("location.city", { required: "City is required" })}
                        placeholder="City"
                        className="border p-2 rounded w-full mb-2"
                    />
                    {errors.location?.city && (
                        <p className="text-red-500 text-sm">{errors.location.city.message}</p>
                    )}
                    <input
                        {...register("location.postalCode", { required: "Postal Code is required" })}
                        placeholder="Postal Code"
                        className="border p-2 rounded w-full mb-2"
                    />
                    {errors.location?.postalCode && (
                        <p className="text-red-500 text-sm">{errors.location.postalCode.message}</p>
                    )}
                    <input
                        {...register("location.country", { required: "Country is required" })}
                        placeholder="Country"
                        className="border p-2 rounded w-full"
                    />
                    {errors.location?.country && (
                        <p className="text-red-500 text-sm">{errors.location.country.message}</p>
                    )}
                </div>

                <input
                    type="number"
                    {...register("pricePerNight", {
                        required: "Price is required",
                        valueAsNumber: true,
                    })}
                    placeholder="Price per Night"
                    className="border p-2 rounded w-full"
                />
                {errors.pricePerNight && (
                    <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>
                )}

                <div>
                    <h3 className="text-lg font-semibold">Facilities</h3>
                    <input
                        type="number"
                        {...register("facilities.capacity", {
                            required: "Capacity is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Capacity"
                        className="border p-2 rounded w-full mb-2"
                    />
                    {errors.facilities?.capacity && (
                        <p className="text-red-500 text-sm">{errors.facilities.capacity.message}</p>
                    )}
                    <input
                        type="number"
                        {...register("facilities.beds", {
                            required: "Number of beds is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Beds"
                        className="border p-2 rounded w-full mb-2"
                    />
                    {errors.facilities?.beds && (
                        <p className="text-red-500 text-sm">{errors.facilities.beds.message}</p>
                    )}
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.petsAllowed")} />
                        Pets Allowed
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.smokingAllowed")} />
                        Smoking Allowed
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.electricity")} />
                        Electricity
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.water")} />
                        Water
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.wifi")} />
                        Wifi
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("facilities.jacuzzi")} />
                        Jacuzzi
                    </label>
                </div>

                <button type="submit" className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white w-full">
                    Create Cabin
                </button>
            </form>

            {success && <p className="text-green-500 mt-2">{success}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}