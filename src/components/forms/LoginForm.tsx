import { useForm } from "react-hook-form";
import { fetchLogin } from "../../hooks/api/auth/fetchLogin.tsx";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data: { email: string; password: string }) => {
        fetchLogin(data.email, data.password);
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                        className="border p-2 w-full rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="border p-2 w-full rounded"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <button type="submit" className="px-8 py-2 rounded-lg bg-[#EA9A36] text-[#FFEDBD] hover:bg-[#FFEDBD] hover:text-[#EA9A36] hover:cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
}
