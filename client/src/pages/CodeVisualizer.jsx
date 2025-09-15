import React, { useEffect } from 'react';
import ExecutionVisualizer from '../components/ExecutionVisualizer';
import { useToast } from '../ui/ToastProvider.jsx';

export default function CodeVisualizer() {
    const { push } = useToast();

    useEffect(() => {
        const handleKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                push('Run visualization');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [push]);

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Code Visualizer</h1>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Write code and visualize its execution step by step. Press
                    <kbd className="px-1">Ctrl</kbd>+<kbd className="px-1">Enter</kbd> to run or use the
                    reset button to restore the default snippet.
                </p>
                <ExecutionVisualizer />
            </div>
        </div>
    );
}