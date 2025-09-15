import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center'>
      <h1 className='text-6xl font-bold text-gray-800 dark:text-gray-100'>Access Denied</h1>
      <p className='text-xl mt-4 text-gray-600 dark:text-gray-300'>You do not have permission to view this page.</p>
      <Link to='/' className='mt-6 px-4 py-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>
        Go back to Home
      </Link>
    </div>
  );
}
