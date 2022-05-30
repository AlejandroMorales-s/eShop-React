import React, {useState} from 'react';
import { Switch } from '@headlessui/react';

export default function DarkModeToggle() {
    const [enabled, setEnabled] = useState(false);

    const darkMode = () => {
        document.getElementById('html').classList.toggle('bg-darkBg');
        document.getElementById('html').classList.toggle('dark');
    }
    return (
        <div onClick={darkMode} className="absolute right-3 top-3 flex">
            <div className=' -translate-y-1'>
                <p className='text-darkBg font-semibold -translate-x-1'>Dark Mode</p>
                <p className='text-white font-semibold -translate-x-1'>Light Mode</p>
            </div>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-primary' : 'bg-primary'}
                    relative inline-flex h-[27.5px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}