import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { Alert } from 'flowbite-react';
import useCodeSnippet from '../hooks/useCodeSnippet';
import Skeleton from '../ui/Skeleton.jsx';
import { useToast } from '../ui/ToastProvider.jsx';

export default function TryItPage() {
    const location = useLocation();
    const { push } = useToast();
    const searchParams = new URLSearchParams(location.search);
    const stateCode = location.state?.code;
    const stateLanguage = location.state?.language;
    const stateExpected = location.state?.expectedOutput;
    const queryCode = searchParams.get('code');
    const queryLanguage = searchParams.get('language');
    const queryExpected = searchParams.get('expectedOutput');
    const snippetId = searchParams.get('snippetId');

    const { snippet, isLoading, error } = useCodeSnippet(snippetId);

    const initialExpected = stateExpected || (queryExpected ? decodeURIComponent(queryExpected) : '');

    // Default message when there's no initial code
    const defaultCodeMessage = `// Welcome to the live code editor!\n// You can write and run HTML, CSS, or JavaScript here.\n// Enjoy experimenting with your code!\n`;

    let initialLanguage;
    let initialCodeObj;

    if (snippetId) {
        if (isLoading || !snippet) {
            return (
                <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <Skeleton className="h-32 w-full" />
                </div>
            );
        }
        if (error) {
            return (
                <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <Alert color="failure" className="w-full max-w-lg text-center">
                        <span className="font-medium">Error:</span> {error}
                    </Alert>
                </div>
            );
        }
        initialLanguage = queryLanguage || 'javascript';
        initialCodeObj = {
            html: snippet.html || '',
            css: snippet.css || '',
            javascript: snippet.js || '',
            cpp: snippet.cpp || '',
            python: snippet.python || '',
        };
    } else {
        const initialCode = stateCode || (queryCode ? decodeURIComponent(queryCode) : null);
        initialLanguage = stateLanguage || queryLanguage || 'javascript';
        initialCodeObj = {
            [initialLanguage]: initialCode || defaultCodeMessage,
        };
    }

    useEffect(() => {
        const handleKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                push('Run code');
            }
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                push('Save code');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [push]);

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-center my-10 leading-tight text-gray-900 dark:text-white">
                    Try It Yourself!
                </h1>
                <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
                    Edit the code in the editor below and see the live output.
                </p>

                {/* Optional: Add an Alert to explain the page's purpose */}
                <Alert color="info" className="mb-8">
                    <p className="font-semibold">Live Code Editor</p>
                    This is a sandbox environment for testing code snippets. Any changes you make will appear in the &quot;Live Output&quot; window.
                </Alert>

                <CodeEditor
                    key={snippetId || initialLanguage}
                    initialCode={initialCodeObj}
                    language={initialLanguage}
                    expectedOutput={initialExpected}
                />
            </div>
        </div>
    );
}
