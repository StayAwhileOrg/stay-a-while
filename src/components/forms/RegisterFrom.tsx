import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchRegister } from '../../hooks/api/auth/fetchRegister.tsx';
import { useNavigate } from 'react-router-dom';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  imgUrl: string;
  bio: string;
};


export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
      try {
          const response = await fetchRegister(
              data.firstName,
              data.lastName,
              data.email,
              data.password,
              data.phone,
              data.imgUrl,
              data.bio
          );

          if (!response) {
              throw new Error('No response from fetch');
          }
          navigate('/');
      } catch (error) {
          console.error(
              'Something went wrong with fetching:',
              (error as Error).message
          );
      }
  };

  return (
    <div className={"flex flex-col h-[90vh] items-center justify-center"}>

      <form onSubmit={handleSubmit(onSubmit)} className={"w-[400px] drop-shadow-lg border border-[#D9D9D9] p-[40px] rounded-[20px] flex flex-col gap-[32px]"}>
        <h2 className={"w-full text-center font-bold text-xl"}>Register</h2>
        <div className={'flex gap-[8px]'}>
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="border p-2 w-full rounded"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="border p-2 w-full rounded"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{8}$/, // Adjust regex for your needs
                message: 'Invalid phone number',
              },
            })}
            className="border p-2 w-full rounded"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Profile Picture</label>
          <input
            type="url"
            {...register('imgUrl', {
              required: 'Profile picture URL is required',
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: 'Enter a valid image URL (png, jpg, jpeg, gif, webp)',
              },
            })}
            className="border p-2 w-full rounded"
            placeholder="Enter profile picture URL"
          />
          {errors.imgUrl && (
            <p className="text-red-500">{errors.imgUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <input
            type="text"
            {...register('bio')}
            className="border p-2 w-full rounded"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="border p-2 w-full rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
