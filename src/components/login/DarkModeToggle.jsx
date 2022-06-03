import React, {useState} from 'react';
import { Switch } from '@headlessui/react';

export default function DarkModeToggle() {
    const [enabled, setEnabled] = useState(false);

    const darkMode = () => {
        document.getElementById('html').classList.toggle('bg-darkBg');
        document.getElementById('html').classList.toggle('dark');
        document.getElementById('html').classList.toggle('bg-ligthBg');
    }
    return (

            <Switch.Group>
                <div className='absolute right-3 top-1 flex flex-col items-center justify-center'>

                    <Switch.Label className={`${enabled && 'text-gray'} font-medium`}>{enabled ? 'Dark mode' : 'Ligth mode'}</Switch.Label>
                
                    <Switch
                        onClick={darkMode}
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? 'bg-primary' : 'bg-primary'}
                            relative inline-flex h-[27.5px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span
                            aria-hidden="true"
                            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>
            </Switch.Group>
    )
}