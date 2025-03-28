import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogin } from '../../hooks/api/auth/fetchLogin.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

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

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
      try {
          const response = await fetchLogin(data.email, data.password);
          if (!response) {
              throw new Error('No response from fetch');
          }

          toast.success('Login successful');
          setTimeout(() => {
              navigate('/');
          }, 2000)
      } catch (error) {
          console.error('Something went wrong with fetching:', (error as Error).message);
          toast.error('Something went wrong with the login');
      }
  };

  return (
    <div className={"flex flex-col h-[90vh] items-center justify-center"}>
        <form
            onSubmit={handleSubmit((onSubmit))}
            className="w-[400px] drop-shadow-lg border border-[#D9D9D9] p-[40px] rounded-[20px] flex flex-col gap-[32px]"
        >
        <h2 className={"w-full text-center font-bold text-xl"}>Login</h2>
        <div>
          <label className="block font-medium mb-2">Email</label>
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
          <label className="block font-medium mb-2">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

          <div>
              <p>Don't have an account? Register <Link to='/register' className='text-blue-400'>here</Link> </p>
          </div>

        <button
          type="submit"
          className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white"
        >
          Login
        </button>
        <ToastContainer position='top-center' autoClose={1900} />
      </form>
    </div>
  );
}
