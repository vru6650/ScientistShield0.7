import { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function PasswordInput(props) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <TextInput type={visible ? 'text' : 'password'} {...props} />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
            >
                {visible ? <HiEyeOff /> : <HiEye />}
            </button>
        </div>
    );
}