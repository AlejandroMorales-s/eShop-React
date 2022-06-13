import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';
import CardPreview from './CardPreview';

export default function CardForm() {

    //* State
    const [validNumber, setValidNumber] = useState({
        valid: false,
        clicked: false
    });
    const [validName, setValidName] = useState({
        valid: false,
        clicked: false
    });
    const [validMonth, setValidMonth] = useState({
        valid: false,
        clicked: false
    });
    const [validYear, setValidYear] = useState({
        valid: false,
        clicked: false
    });
    const [validCcv, setValidCcv] = useState({
        valid: false,
        clicked: false
    });
    const [rotate, setRotate] = useState(false);
    const [inactiveButton, setInactiveButton] = useState(true);
    const [cardInfo, setCardInfo] = useState({
        name: '',
        number: '',
        month: '',
        year: '',
        type: '',
        paymentMethod: '',
        ccv: '',
        default: false
    });
    const {name, number, month, year, type, ccv} = cardInfo;

    const navigate = useNavigate();

    //* Context
    const {cards, setCards} = useContext(globalContext);

    //* Add card
    const addCard = (e) => {
        e.preventDefault();
        setCards([...cards, cardInfo]);
        navigate('/account/my-cards');
    };
    
    //* Name
    const nameRegex = (name) => {
        return name.toString()
        .replace(/[^a-zA-Z ]/g, '');
    };

    const changeName = (name) => {
        setRotate(false);
        name = nameRegex(name);
        name.length === 0 ? setValidName({...validName, valid: false}) : setValidName({...validName, valid: true});
        setCardInfo({
            ...cardInfo,
            name: name
        });
        inactiveButtonCheck();
    };
    
    //* Number
    const numberRegex = (number) => {
        return number.toString()
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/([0-9]{4})/g, '$1 ')
        .trim();
    };
    
    const changeNumber = (number) => {
        setRotate(false);
        number = numberRegex(number);
        let numberCopy = number;
        let type = '';
        if (number.length < 19) {
            setValidNumber({
                ...validNumber,
                valid: false,
            });
            number = number.slice(0, 19);
        } else if (numberCopy.toString().slice(0,1) == 4) {
            number = number.slice(0, 19);
            type = 'Visa';
            setValidNumber({
                ...validNumber,
                valid: true,
            });
        } else if (numberCopy.toString().slice(0,1) == 5) {
            number = number.slice(0, 19);
            type = 'Mastercard';
            setValidNumber({
                ...validNumber,
                valid: true,
            });
        } else if (number.length >= 19) {
            number = number.slice(0, 19);
            setValidNumber({
                ...validNumber,
                valid: true,
            });
        };

        setCardInfo({
            ...cardInfo,
            number: number,
            type: type
        });
        inactiveButtonCheck();
    };
    
    //* Expiry
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    
    const changeMonth = (month) => {
        setRotate(false);
        let newMonth;
        month < 10 ? newMonth = month.toString().slice(1, 2) : newMonth = month;
        
        if (month === '' || month === undefined || month.toString().slice(0, 2) > 12 || month.toString().slice(0, 2) < 1) {
            month = month.slice(0, 2);
            setValidMonth({
                ...validMonth,
                valid: false,
            });
        } else if (newMonth < currentMonth && year === currentYear.toString().slice(-2)) {
            month = month.slice(0, 2);
            setValidMonth({
                ...validMonth,
                valid: false,
            });
        } else if (month.length >= 2) {
            month = month.slice(0, 2);
            setValidMonth({
                ...validMonth,
                valid: true,
            });
        }
        setCardInfo({
            ...cardInfo,
            month: month
        });
        inactiveButtonCheck();
    };

    const changeYear = (year) => {
        setRotate(false);
        if (year === '' || year === undefined || year < currentYear.toString().slice(-2)) {
            year = year.slice(0, 2);
            setValidYear({
                ...validYear,
                valid: false,
            });
        } else if (year.length >= 2) {
            year = year.slice(0, 2);
            setValidYear({
                ...validYear,
                valid: true,
            });
        };
        setCardInfo({
            ...cardInfo,    
            year: year
        });
        inactiveButtonCheck();
    };

    //* CCV
    const changeCcv = (ccv) => {
        if (ccv.length < 3) {
            setValidCcv({
                ...validCcv,
                valid: false,
            });
        } else if (ccv.length >= 3) {
            ccv = ccv.slice(0, 3);
            setValidCcv({
                ...validCcv,
                valid: true,
            });
        }
        setCardInfo({
            ...cardInfo,    
            ccv: ccv
        });
        inactiveButtonCheck();
    };

    //* Rotate
    const rotateCard = () => {
        setRotate(true);
        setValidCcv({
            ...validCcv, 
            clicked: true
        });
    };

    //* Inactive button
    const inactiveButtonCheck = () => {
        if (validNumber.valid && validName.valid && validMonth.valid && validYear.valid && validCcv.valid) {
            setInactiveButton(false);
        } else {
            setInactiveButton(true);
        };
    };

    return (
        <>
            <CardPreview name={name} number={number} month={month} year={year} type={type} ccv={ccv} rotate={rotate}/>
            <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 h-fit bg-white shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark'>

                <form onSubmit={addCard} className='flex flex-col gap-2'>
                    <div>
                        <label className='text-bold font-medium dark:text-primary-light text-boldText'>Number</label>
                        <input onClick={() => setValidNumber({...validNumber, clicked: true})} className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg dark:text-gray' onChange={e => changeNumber(e.target.value)} type="text" placeholder='#### #### #### ####' value={number} />
                        <div className={`${validNumber.valid ? 'bg-green' : 'bg-red'} transition-all delay-100 ease-out h-fit px-1 py-0.5 ${validNumber.clicked ? 'relative opacity-100' : 'absolute opacity-0'} rounded rounded-bl-xl`}>
                            {validNumber.valid ? <p>Valid card! 🥳</p> : <p>Put a valid number 😞</p>}
                        </div>
                    </div>
                    <div>
                        <label className='text-bold font-medium dark:text-primary-light text-boldText'>Name</label>
                        <input onClick={() => setValidName({...validName, clicked: true})} className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg dark:text-gray' onChange={e => changeName(e.target.value)} type="text" placeholder='John Doe' value={name} />
                        <div className={`${validName.valid ? 'bg-green' : 'bg-red'} transition-all delay-100 ease-out h-fit px-1 py-0.5 ${validName.clicked ? 'relative opacity-100' : 'absolute opacity-0'} rounded rounded-bl-xl`}>
                            {validName.valid ? <p>🥳</p> : <p>Write your name 😁</p>}
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <hr className='w-full text-gray dark:text-gray-grayDark'/>
                        <p className='block text-text font-medium'>Expiration</p>
                        <hr className='w-full text-gray dark:text-gray-grayDark'/>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-full'>
                            <label className='text-bold font-medium dark:text-primary-light text-boldText'>Month</label>
                            <input onClick={() => setValidMonth({...validMonth, clicked: true})} className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg dark:text-gray' onChange={e => changeMonth(e.target.value)} type="number" placeholder='01' value={month} />
                            <div className={`${validMonth.valid ? 'bg-green' : 'bg-red'} transition-all delay-100 ease-out h-fit px-1 py-0.5 ${validMonth.clicked ? 'relative opacity-100' : 'absolute opacity-0'} rounded rounded-bl-xl`}>
                                {validMonth.valid ? <p>Valid month! 🥳</p> : <p>Select a month between 01-12 😞</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className='text-bold font-medium dark:text-primary-light text-boldText'>Year</label>
                            <input onClick={() => setValidYear({...validYear, clicked: true})} className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg dark:text-gray' onChange={e => changeYear(e.target.value)} type="number" placeholder='22' value={year} />
                            <div className={`${validYear.valid ? 'bg-green' : 'bg-red'} transition-all delay-100 ease-out h-fit px-1 py-0.5 ${validYear.clicked ? 'relative opacity-100' : 'absolute opacity-0'} rounded rounded-bl-xl`}>
                                {validYear.valid ? <p>Valid Year! 🥳</p> : <p>Select a valid year 😞</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <hr className='w-full text-gray dark:text-gray-grayDark'/>
                        <p className='block text-text font-medium'>CCV</p>
                        <hr className='w-full text-gray dark:text-gray-grayDark'/>
                    </div>
                    <div>
                        <label className='text-bold font-medium dark:text-primary-light text-boldText'>CCV</label>
                        <input onClick={rotateCard} className='px-1 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg dark:text-gray' onChange={e => changeCcv(e.target.value)} type="password" placeholder='***' value={ccv} />
                        <div className={`${validCcv.valid ? 'bg-green' : 'bg-red'} transition-all delay-100 ease-out h-fit px-1 py-0.5 ${validCcv.clicked ? 'relative opacity-100' : 'absolute opacity-0'} rounded rounded-bl-xl`}>
                            {validCcv.valid ? <p>Valid card! 🥳</p> : <p>Put a valid number 😞</p>}
                        </div>
                    </div>
                    <button type="submit" disabled={inactiveButton} className={`${inactiveButton ? 'opacity-50' : 'opacity-100'} shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`}>Add card</button>
                </form>
            </div>
        </>
    )
}
