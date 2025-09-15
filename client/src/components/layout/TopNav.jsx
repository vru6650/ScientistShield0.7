import { Bell, Menu } from 'lucide-react';
import { Avatar, Dropdown } from 'flowbite-react';
import ThemeToggle from '../../theme/ThemeToggle.jsx';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../../redux/user/userSlice';

export default function TopNav({ onMenuClick }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout', { method: 'POST' });
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="flex h-16 items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <a href="#" className="font-semibold">
          ScientistShield
        </a>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden w-full max-w-xs md:block">
            <Input type="search" placeholder="Search..." aria-label="Search" />
          </div>
          {currentUser ? (
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <Avatar
                  img={currentUser.profilePicture}
                  alt={currentUser.username || 'profile'}
                  rounded
                  className="h-8 w-8 cursor-pointer"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button variant="primary" size="sm" aria-label="Sign in">
                Sign In
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
