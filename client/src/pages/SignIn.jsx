import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { signInUser } from '../services/authService';
import OAuth from '../components/OAuth';
import PasswordInput from '../components/PasswordInput';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export default function SignIn() {
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const handleFormSubmit = async (formData) => {
    try {
      dispatch(signInStart());
      const data = await signInUser(formData);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-900 dark:to-black p-3'>
        <div className='flex p-6 max-w-3xl w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl flex-col md:flex-row md:items-center gap-5'>
          {/* left */}
          <div className='flex-1'>
            <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Sahand's
            </span>
              Blog
            </Link>
            <p className='text-sm mt-5 text-gray-700 dark:text-gray-300'>
              This is a demo project. You can sign in with your email and password
              or with Google.
            </p>
          </div>
          {/* right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <Label value='Your email' />
                <TextInput
                    type='email'
                    placeholder='name@company.com'
                    id='email'
                    {...register('email')}
                />
                {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label value='Your password' />
                <PasswordInput
                    placeholder='**********'
                    id='password'
                    {...register('password')}
                />
                {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                )}
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </>
                ) : (
                    'Sign In'
                )}
              </Button>
              <OAuth />
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Don't have an account?</span>
              <Link to='/sign-up' className='text-blue-500'>
                Sign Up
              </Link>
            </div>
            {errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
            )}
          </div>
        </div>
      </div>
  );
}