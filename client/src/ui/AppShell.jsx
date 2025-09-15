/* eslint-disable react/prop-types */
import { Avatar, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import ThemeToggle from './ThemeToggle';
import Footer from '../components/Footer';

export default function AppShell({ sidebar, children }) {
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
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="container flex h-14 items-center justify-between">
          <span className="font-bold">ScientistShield</span>
          <nav className="flex items-center gap-4">
            <a href="/" className="hocus:underline">
              Home
            </a>
            <a href="/projects" className="hocus:underline">
              Projects
            </a>
            {currentUser ? (
              <Dropdown
                inline
                arrowIcon={false}
                label={
                  <Avatar
                    img={currentUser.profilePicture}
                    alt={currentUser.username || 'user'}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item as={Link} to="/admin?tab=profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in" className="hocus:underline">
                Sign In
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <div className="container grid flex-1 gap-4 md:grid-cols-[200px_1fr]">
        {sidebar && (
          <aside className="hidden md:block" aria-label="Sidebar">
            {sidebar}
          </aside>
        )}
        <main id="main" className="py-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
