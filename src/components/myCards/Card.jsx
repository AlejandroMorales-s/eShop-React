import React, {useContext} from 'react';
import VisaLogo from '../../assets/logo-visa.png';
import MastercardLogo from '../../assets/logo-mastercard.png';
import { globalContext } from '../globalContext/GlobalContext';

export default function Card({card, component}) {
    const {id, type, name, number, month, year} = card;
    
    const {cards, setCards} = useContext(globalContext);
    
    const deleteCard = () => {
        const card = cards.filter(card => card.id !== id);
        setCards(card);
    };
    return (
        <>
            <div className='border-2 h-[100px] w-full rounded flex gap-2  items-center border-gray p-2 hover:shadow-containersShadow bg-white dark:bg-darkBg dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-light hover:-translate-y-0.5 transition-all ease-in-out delay-50'>
                <div className='bg-white h-[65px] min-w-[65px] border-2 border-gray dark:border-gray-grayDark rounded-full overflow-hidden flex justify-center items-center'>
                    <img className='w-[65px] object-cover' src={`${type === 'Visa' ? VisaLogo : MastercardLogo}`} alt="logo"/>
                </div>
                <div className='w-full'>
                    <p className='text-boldText font-medium dark:text-white'>Finished in {number.slice(-4)}</p>
                    <p className='text-text dark:text-gray'>{type}</p>
                    <p className='text-text dark:text-gray'>Expiration: {month}/{year}</p>
                    <p className='text-text dark:text-gray'>{name}</p>
                </div>
                <div className='min-w-[250px] flex justify-end gap-2 '>
                    {component !== 'MyCards' ? 
                        <button className='shadow-shadow px-2 py-1 bg-primary text-white font-medium rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light'>Select</button>
                    :
                        <>
                            <button className='shadow-shadow px-2 py-1 bg-primary text-white font-medium rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light'>Set default</button>
                            <button onClick={deleteCard} className='px-2 py-1 bg-red dark:bg-red text-white font-medium rounded border-2 border-red transition-all hover:bg-transparent hover:text-red  dark:border-red dark:hover:bg-transparent dark:hover:text-red'>Delete</button>
                        </> 
                    }
                </div>
            </div>
        </>
    )
}
