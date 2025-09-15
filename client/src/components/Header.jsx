// client/src/components/Header.jsx

import { Avatar, Button, Navbar, TextInput, Tooltip, Modal } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineFileAdd,
  AiOutlineLogout,
} from 'react-icons/ai';
import { FaMoon, FaSun, FaHome, FaInfoCircle, FaCode, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

// --- NEW: Reusable Custom Hook ---
/**
 * A custom hook to detect clicks outside of a specified element.
 * @param {React.RefObject} ref - The ref of the element to monitor.
 * @param {Function} handler - The function to call when a click outside is detected.
 */
const useClickAway = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};


// --- Helper Components (Magnetic is unchanged) ---
function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
      <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x, y }} transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}>
        {children}
      </motion.div>
  );
}

// --- UPGRADED: Enhanced Command Menu ---
function CommandMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Restructured with sections and icons
  const commandItems = [
    {
      section: 'Quick Actions',
      items: [
          { label: 'Profile', path: '/admin?tab=profile', icon: <AiOutlineUser /> },
        { label: 'Create a Post', path: '/create-post', icon: <AiOutlineFileAdd /> },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?searchTerm=${searchTerm}`);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
      <AnimatePresence>
        {isOpen && (
            <Modal show={isOpen} onClose={onClose} popup size="lg">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleSubmit}>
                    <TextInput icon={AiOutlineSearch} placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
                  </form>
                  <div className='mt-4'>
                    {commandItems.map((group) => (
                        <div key={group.section}>
                          <h3 className='px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{group.section}</h3>
                          <ul className='mt-1 mb-3 space-y-1'>
                            {group.items.map(link => (
                                <li key={link.path}>
                                  <Link to={link.path} onClick={onClose} className='flex items-center gap-3 p-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                                    <span className="text-gray-400">{link.icon}</span>
                                    <span>{link.label}</span>
                                  </Link>
                                </li>
                            ))}
                          </ul>
                        </div>
                    ))}
                  </div>
                </Modal.Body>
              </motion.div>
            </Modal>
        )}
      </AnimatePresence>
  );
}

// --- NEW: Modular Component for User Profile Dropdown ---
function UserProfileDropdown({ currentUser, onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const dropdownRef = useRef(null);

  // Use the custom hook to close the dropdown on outside click
  useClickAway(dropdownRef, () => setIsDropdownOpen(false));

  const handleSignoutClick = () => {
    setIsDropdownOpen(false);
    setShowSignOutModal(true);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
      <>
        <div className="relative" ref={dropdownRef}>
          <Avatar
              alt={currentUser.username || 'user avatar'}
              img={currentUser.profilePicture}
              rounded
              bordered
              color="light-blue"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer"
          />
          <AnimatePresence>
            {isDropdownOpen && (
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 z-50 origin-top-right overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <span className='block text-sm font-semibold'>@{currentUser.username}</span>
                    <span className='block text-xs font-medium truncate text-gray-500 dark:text-gray-400'>{currentUser.email}</span>
                  </div>
                  <div className="py-1">
                    <Link to={'/admin?tab=profile'} onClick={() => setIsDropdownOpen(false)}>
                      <div className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'>
                        <AiOutlineUser /> Profile
                      </div>
                    </Link>
                  </div>
                  <div
                      className='flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer border-t border-gray-200 dark:border-gray-700'
                      onClick={handleSignoutClick}
                  >
                    <AiOutlineLogout /> Sign out
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Modal show={showSignOutModal} onClose={() => setShowSignOutModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to sign out?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={() => { onSignOut(); setShowSignOutModal(false); }}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowSignOutModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
  );
}


// --- Main Header Component ---
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { scrollY, scrollYProgress } = useScroll(); // Added scrollYProgress
  const headerRef = useRef(null);

  // Added icons for mobile menu
  const navLinks = [
    { label: 'Home', path: '/', icon: <FaHome /> },
    { label: 'About', path: '/about', icon: <FaInfoCircle /> },
    { label: 'Projects', path: '/projects', icon: <FaCode /> },
    { label: 'Code Editor', path: '/tryit', icon: <FaLaptopCode /> },
    { label: 'Code Visualizer', path: '/visualizer', icon: <FaChartLine /> },
  ];

  const handleMouseMove = (e) => {
    if (headerRef.current) {
      const { clientX, clientY } = e;
      const { left, top } = headerRef.current.getBoundingClientRect();
      headerRef.current.style.setProperty('--mouse-x', `${clientX - left}px`);
      headerRef.current.style.setProperty('--mouse-y', `${clientY - top}px`);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout', { method: 'POST' });
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  return (
      <>
        {/* NEW: Reading Progress Bar */}
        <motion.div
            className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50'
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        />

        <motion.header
            className='fixed top-0 left-0 right-0 z-40 p-2 sm:p-3' // Lowered z-index to be below progress bar
            initial={{ y: -100 }}
            animate={{ y: isHeaderVisible ? 0 : -100 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div ref={headerRef} onMouseMove={handleMouseMove} className='relative mx-auto max-w-6xl'>
            <motion.div
                className='absolute inset-0 h-full w-full rounded-full border shadow-lg backdrop-blur-xl overflow-hidden' // Increased blur
                style={{
                  borderColor: theme === 'light' ? 'rgba(229, 231, 235, 0.7)' : 'rgba(55, 65, 81, 0.7)',
                  backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(17, 24, 39, 0.6)',
                  '--spotlight-color-light': 'rgba(200, 200, 200, 0.1)',
                  '--spotlight-color-dark': 'rgba(255, 255, 255, 0.05)',
                }}
            >
              <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${theme === 'light' ? 'var(--spotlight-color-light)' : 'var(--spotlight-color-dark)'}, transparent 35%)`,
                  }}
              />
            </motion.div>
            <Navbar fluid rounded className='bg-transparent dark:bg-transparent relative z-10'>
              <Link to='/' className='text-sm sm:text-xl font-semibold text-gray-700 dark:text-white'>
              <span className='px-2 py-1 bg-professional-gradient rounded-lg text-white animated-gradient'>
                Scientist
              </span>
                Shield
              </Link>
              <motion.div
                  className='hidden lg:flex items-center gap-1'
                  variants={navContainerVariants}
                  initial="hidden"
                  animate="show"
              >
                {navLinks.map((link) => {
                  const isActive = path === link.path;
                  return (
                      <motion.div variants={navItemVariants} key={link.path}>
                        <Link to={link.path} className='relative px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300'>
                          {isActive && (<motion.span layoutId='active-pill' className='absolute inset-0 bg-gray-100 dark:bg-gray-700' style={{ borderRadius: 9999 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />)}
                          <span className='relative z-10'>{link.label}</span>
                        </Link>
                      </motion.div>
                  );
                })}
              </motion.div>
              <div className='flex items-center gap-3 md:order-2'>
                <Magnetic>
                  <Tooltip content="Search (⌘+K)">
                    <Button aria-label='Open search menu' className='w-12 h-10' color='gray' pill onClick={() => setIsCommandMenuOpen(true)}>
                      <AiOutlineSearch />
                    </Button>
                  </Tooltip>
                </Magnetic>
                <Magnetic>
                  <Tooltip content="Toggle Theme">
                    <Button aria-label='Toggle theme' className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                      <AnimatePresence mode='wait' initial={false}>
                        <motion.span key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                          {theme === 'light' ? <FaSun /> : <FaMoon />}
                        </motion.span>
                      </AnimatePresence>
                    </Button>
                  </Tooltip>
                </Magnetic>
                {currentUser ? (
                    // Using the new modular component
                    <UserProfileDropdown currentUser={currentUser} onSignOut={handleSignout} />
                ) : (
                    <Link to='/sign-in'><Button gradientDuoTone='purpleToBlue' outline>Sign In</Button></Link>
                )}
                <Navbar.Toggle aria-label='Toggle navigation menu' />
              </div>
              <Navbar.Collapse>
                {navLinks.map((link) => (
                    <Navbar.Link active={path === link.path} as={'div'} key={link.path} className="lg:hidden">
                      <Link to={link.path} className="flex items-center gap-2 py-2">
                        {link.icon} {link.label}
                      </Link>
                    </Navbar.Link>
                ))}
              </Navbar.Collapse>
            </Navbar>
          </div>
        </motion.header>
        <CommandMenu isOpen={isCommandMenuOpen} onClose={() => setIsCommandMenuOpen(false)} />
      </>
  );
}