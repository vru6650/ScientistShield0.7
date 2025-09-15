import { LayoutDashboard, FileText, FlaskConical, ListChecks, Settings, ShieldCheck, BookOpenText, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const items = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Posts', href: '/posts' },
    { icon: BookOpenText, label: 'CMS', href: '/cms' },
    { icon: FlaskConical, label: 'Playground', href: '/tryit' },
    { icon: ListChecks, label: 'Quizzes', href: '/quizzes' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: ShieldCheck, label: 'Admin', href: '/admin' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

function NavContent() {
    return (
        <nav className="space-y-1 p-4">
            {items.map(({ icon: Icon, label, href }) => (
                <Link
                    key={label}
                    to={href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    <Icon className="h-5 w-5" />
                    {label}
                </Link>
            ))}
        </nav>
    );
}

export default function Sidebar({ open, onClose }) {
    return (
        <>
            <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-900 md:flex">
                <NavContent />
            </aside>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 flex md:hidden"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
                        <motion.aside
                            className="relative w-64 bg-white p-4 dark:bg-gray-900"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                        >
                            <NavContent />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}