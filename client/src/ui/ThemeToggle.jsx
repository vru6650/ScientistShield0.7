import { useTheme } from '../theme/ThemeProvider.jsx';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
      <button
          type="button"
          onClick={toggle}
          className="p-2 rounded-md border border-border bg-surface text-text hocus:bg-muted/10"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
  );
}