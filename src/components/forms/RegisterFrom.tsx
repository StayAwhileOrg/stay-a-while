import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchRegister } from '../../hooks/api/auth/fetchRegister.tsx';
import  {Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Mail, Phone, CircleUser, User, Edit, Key } from "lucide-react";

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

          toast.success('Register successful!');
          setTimeout(() => {
            navigate('/');
          }, 2000)

      } catch (error) {
          console.error('Something went wrong with fetching:', (error as Error).message);
          toast.error('Something went wrong with the register form');
      }
  };

  return (
    <div className={"flex flex-col h-[120vh] items-center justify-center"}>

      <form
          onSubmit={handleSubmit((onSubmit))} noValidate
          className={"w-[400px] drop-shadow-lg border border-[#D9D9D9] p-[40px] rounded-[20px] flex flex-col gap-[26px]"}>
        <h2 className={"w-full text-center font-bold text-xl"}>Register</h2>


        <div className={'flex gap-[8px]'}>
          <div className='relative'>
            <label className="block font-medium mb-2">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className="border p-2 w-full rounded pl-10"
                  placeholder="First name"
              />
            </div>
            {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className='relative'>
            <label className="block font-medium mb-2">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="border p-2 w-full rounded pl-10"
                  placeholder="Last name"
              />
            </div>
            {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="border p-2 w-full rounded pl-10"
                placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{8}$/, // Adjust regex for your needs
                    message: 'Invalid phone number or already in use',
                  },
                })}
                className="border p-2 w-full rounded pl-10"
                placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2">Profile Picture</label>
          <div className="relative">
            <CircleUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="url"
                {...register('imgUrl', {
                  required: 'Profile picture URL is required',
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                    message: 'Enter a valid image URL (png, jpg, jpeg, gif, webp)',
                  },
                })}
                className="border p-2 w-full rounded pl-10"
                placeholder="Enter profile picture URL"
            />
          </div>
          {errors.imgUrl && <p className="text-red-500">{errors.imgUrl.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2">Bio</label>
          <div className="relative">
            <Edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                {...register('bio')}
                className="border p-2 w-full rounded pl-10"
                placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Password</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="border p-2 w-full rounded pl-10"
                placeholder="Enter your password"
            />
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>


        <button
          type="submit"
          className="px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white"
        >
          Register
        </button>

        <div className='flex flex-col items-center justify-center gap-2'>
          <p>Or</p>
          <p>Go back to <Link to='/login' className='text-blue-500 hover:underline'>login</Link></p>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
}
