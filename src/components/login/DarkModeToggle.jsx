import React from 'react';

export default function DarkModeToggle() {
    const darkMode = () => {
        document.getElementById('html').classList.toggle('bg-darkBg');
        document.getElementById('html').classList.toggle('dark');
    }
    return (
        <p className='absolute font-semibold text-darkBg dark:text-gray right-3 top-3' onClick={darkMode}>Dark Mode</p>
    )
}
