import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
