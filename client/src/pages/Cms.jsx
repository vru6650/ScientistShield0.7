import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

export default function Cms() {
    return (
        <div className="p-4 flex flex-col gap-4">
            <Link to="/create-post">
                <Button>New Post</Button>
            </Link>
            <Link to="/create-tutorial">
                <Button>New Tutorial</Button>
            </Link>
            <Link to="/create-quiz">
                <Button>New Quiz</Button>
            </Link>
        </div>
    );
}