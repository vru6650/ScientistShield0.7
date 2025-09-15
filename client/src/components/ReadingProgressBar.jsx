// src/components/ReadingProgressBar.jsx

import { useState, useEffect } from 'react';

/**
 * Displays a thin progress bar at the top of the page that indicates
 * how much of the document has been scrolled. This gives readers a
 * quick visual cue of their reading progress.
 */
export default function ReadingProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = window.scrollY;
            const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            aria-hidden="true"
            className="fixed left-0 top-0 z-50 h-1 bg-blue-600 dark:bg-blue-400 transition-[width] duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
        />
    );
}

