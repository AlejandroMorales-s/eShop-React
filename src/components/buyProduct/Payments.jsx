import React, {useContext} from 'react';
import ReactDocumentTitle from 'react-document-title';
import { globalContext } from '../globalContext/GlobalContext';
import Card from '../myCards/Card';

export default function Payments({setView}) {
    const {cards} = useContext(globalContext);
    const modifyView = () => {
        setView('shipping');
    }
    return (
        <>
            <ReactDocumentTitle title='Payments'/>
            <div className='p-2 flex flex-col gap-4'>
                <h2 className='font-semibold text-subtitle dark:text-gray'>How would you like to pay?</h2>
                <div className='w-full bg-transparent flex flex-col gap-2'>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            component={'Payments'}
                        />
                    ))}
                </div>
                <button onClick={modifyView} className='w-fit shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light'>Continue</button>
            </div>
        </>
    )
}
