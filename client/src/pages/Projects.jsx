import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { useToast } from '../ui/ToastProvider.jsx';

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <EmptyState
        title="No projects yet"
        description="Get started by creating your first project."
        action={<Button onClick={() => push('Project creation not implemented')}>Create Project</Button>}
      />
    </div>
  );
}
