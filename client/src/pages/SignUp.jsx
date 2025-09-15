import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signUpUser } from '../services/authService';
import OAuth from '../components/OAuth';
import PasswordInput from '../components/PasswordInput';

const signUpSchema = z.object({
  username: z
      .string()
      .min(3, 'Username must be at least 3 characters long.')
      .max(20, 'Username must be no more than 20 characters long.')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await signUpUser(formData);
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
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
              This is a demo project. You can sign up with your email and password
              or with Google.
            </p>
          </div>
          {/* right */}
          <div className='flex-1'>
            <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
              <div>
                <Label value='Your username' />
                <TextInput
                    type='text'
                    placeholder='Username'
                    id='username'
                    {...register('username')}
                />
                {errors.username && (
                    <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                )}
              </div>
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
                    placeholder='Password'
                    id='password'
                    {...register('password')}
                />
                {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label value='Confirm your password' />
                <PasswordInput
                    placeholder='Confirm Password'
                    id='confirmPassword'
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button
                  gradientDuoTone='purpleToPink'
                  type='submit'
                  disabled={loading}
              >
                {loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </>
                ) : (
                    'Sign Up'
                )}
              </Button>
              <OAuth />
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/sign-in' className='text-blue-500'>
                Sign In
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