import React, {useContext, useState, useRef, useEffect} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
import InfoModal from '../modals/InfoModal';

export default function AddAddressForm() {

    //* Context
    const {addresses, setAddresses} = useContext(globalContext);

    //* States
    const [error, setError] = useState({
        isError: false,
        error: ""
    });
    const [success, setSuccess] = useState(false);
    const [inactiveButton, setInactiveButton] = useState(true);
    
    //* Refs
    const country = useRef();
    const name = useRef();
    const streetNumber = useRef();
    const postalCode = useRef();
    const phoneNumber = useRef();
    const instructions = useRef();

    //* Active Button
    const validation = () => { 
        if (country.current.value === "" || name.current.value === "" || streetNumber.current.value === "" || postalCode.current.value.length !== 5 || phoneNumber.current.value === "") {
            setInactiveButton(true);
        } else {
            setInactiveButton(false);
        }
    }

    //* Create id for new direction
    const createId = () => {
        let id = Math.floor(Math.random() * 1000000);
        return id;
    }

    //* Add Direction
    const addDirection = (e) => {
        e.preventDefault();

        if (country.current.value === "" || name.current.value === "" || streetNumber.current.value === "") {
            //alert("Please fill in all the fields");
            setError({
                isError: true,
                error: "Please fill in all the fields"
            });
        } else if (postalCode.current.value.length !== 5) {
            //alert("Please enter a valid postal code");
            setError({
                isError: true,
                error: "Please enter a valid postal code"
            });
        } else if (phoneNumber.current.value.length < 8) {
            //alert("Please enter a valid phone number");
            setError({
                isError: true,
                error: "Please enter a valid phone number"
            });
        } else {
            setSuccess(true);
            setAddresses([...addresses,{
                directionAdded: true,
                country: country.current.value,
                name: name.current.value,
                streetAndNumber: streetNumber.current.value,
                postalCode: postalCode.current.value,
                phoneNumber: phoneNumber.current.value,
                instructions: instructions.current.value,
                id: createId()
            }]);
        }
    }
    
    //* Effect
    useEffect(()=>{
        country.current.oninput = validation;
        name.current.oninput = validation;
        streetNumber.current.oninput = validation;
        postalCode.current.oninput = validation;
        phoneNumber.current.oninput = validation;
    },[country, name, streetNumber, postalCode, phoneNumber])

    return (
        <>
            <h2 className='text-center m-3 text-title text-boldText font-semibold dark:text-gray'>Add address</h2>
            <form onSubmit={addDirection} className='bg-white shadow-containersShadow p-4 rounded flex flex-col m-auto w-95 max-w-70'>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Country or region</label>
                    <input ref={country} name='country' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Country or region' />
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Full name</label>
                    <input ref={name} name='name' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Full name' />
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Street and number</label>
                    <input ref={streetNumber} name='streetAndNumber' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Street and number' />
                </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Postal code</label>
                        <input ref={postalCode} name='postalCode' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="number" placeholder='For example, 01000' />
                    </div>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Phone number</label>
                        <input ref={phoneNumber} name='phoneNumber' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="number" placeholder='For example, +48123456789' />
                    </div>
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Aditional instructions (optional)</label>
                    <textarea ref={instructions} name='instructions' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='For example, "Do not forget to bring your passport"' />
                </div>
                <button disabled={inactiveButton} className={`${inactiveButton ? 'opacity-50' : 'opacity-100'} shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth dark:hover:bg-transparent dark:hover:text-primary-ligth`} type="submit">Add address</button>
            </form>
            {success && <InfoModal color={'green'} title={'Address created succesfully'} desc={''} btn={'Ok'} open={success} />}
        </>
    )
}
