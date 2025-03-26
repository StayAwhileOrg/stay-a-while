import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogin } from '../../hooks/api/auth/fetchLogin.tsx';

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    fetchLogin(data.email, data.password);
  };

  return (
    <div className={"flex flex-col h-[90vh] items-center justify-center"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"w-[400px] drop-shadow-lg border border-[#D9D9D9] p-[40px] rounded-[20px] flex flex-col gap-[32px]"}>
        <h2 className={"w-full text-center font-bold text-xl"}>Login</h2>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Invalid email address',
              },
            })}
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
