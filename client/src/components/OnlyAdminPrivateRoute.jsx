import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '../ui/ToastProvider.jsx';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const { push } = useToast();

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      push('Access denied: Admins only');
    }
  }, [currentUser, push]);

  if (!currentUser) {
    return <Navigate to='/sign-in' />;
  }

  return currentUser.isAdmin ? <Outlet /> : <Navigate to='/access-denied' />;
}
