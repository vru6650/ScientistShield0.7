import {
  Bell,
  Menu,
  Home,
  BookOpenText,
  Code2,
  ListChecks,
  User as UserIcon,
} from 'lucide-react';
import { Avatar, Dropdown } from 'flowbite-react';
import ThemeToggle from '../../theme/ThemeToggle.jsx';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../../redux/user/userSlice';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tutorials', label: 'Tutorials', icon: BookOpenText },
  { href: '/tryit', label: 'Code Editor', icon: Code2 },
  { href: '/quizzes', label: 'Quizzes', icon: ListChecks },
  { href: '/profile', label: 'Profile', icon: UserIcon },
];

export default function TopNav({ onMenuClick }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout', { method: 'POST' });
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/80 backdrop-blur transition-transform dark:bg-gray-900/80 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex h-16 w-full items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <a href="/" className="font-semibold">
          ScientistShield
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              to={href}
              aria-label={label}
              className="flex items-center gap-1 rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center justify-end gap-2">
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
