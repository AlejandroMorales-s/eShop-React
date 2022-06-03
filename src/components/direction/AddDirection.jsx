import React, {useContext, useState} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
import InfoModal from '../modals/InfoModal';

export default function AddDirection() {

    //* Context
    const {setDirection} = useContext(globalContext);
    const [error, setError] = useState({
        isError: false,
        error: ""
    });
    const [success, setSuccess] = useState(false);

    //* Add Direction
    const addDirection = (e) => {
        e.preventDefault();
        const {country, name, streetAndNumber, postalCode, phoneNumber, instructions} = e.target;

        if (country.value === "" || name.value === "" || streetAndNumber.value === "") {
            //alert("Please fill in all the fields");
            setError({
                isError: true,
                error: "Please fill in all the fields"
            });
        } else if (postalCode.value.length !== 5) {
            //alert("Please enter a valid postal code");
            setError({
                isError: true,
                error: "Please enter a valid postal code"
            });
        } else if (phoneNumber.value.length < 8) {
            //alert("Please enter a valid phone number");
            setError({
                isError: true,
                error: "Please enter a valid phone number"
            });
        } else {
            setSuccess(true);
            setDirection({
                directionAdded: true,
                country: country.value,
                name: name.value,
                streetAndNumber: streetAndNumber.value,
                postalCode: postalCode.value,
                phoneNumber: phoneNumber.value,
                instructions: instructions.value,
            });
        }
    }
    return (
        <>
            <h2 className='text-center m-3 text-title text-boldText font-semibold dark:text-gray'>Add Direction</h2>
            <form onSubmit={addDirection} className='bg-white shadow-containersShadow p-4 rounded flex flex-col m-auto w-95 max-w-70'>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Country or region</label>
                    <input name='country' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Country or region' />
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Full name</label>
                    <input name='name' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Full name' />
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Street and number</label>
                    <input name='streetAndNumber' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='Street and number' />
                </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Postal code</label>
                        <input name='postalCode' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="number" placeholder='For example, 01000' />
                    </div>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Phone number</label>
                        <input name='phoneNumber' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="number" placeholder='For example, +48123456789' />
                    </div>
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-primary-ligth text-boldText' htmlFor="">Aditional instructions (optional)</label>
                    <textarea name='instructions' className='border-2 border-primary dark:border-primary-ligth rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-ligth dark:focus:ring-primary-ligth dark:text-gray dark:bg-darkBg' type="text" placeholder='For example, "Do not forget to bring your passport"' />
                </div>
                <button className='shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth dark:hover:bg-transparent dark:hover:text-primary-ligth' type="submit">Add direction</button>
            </form>
            {success && <InfoModal open={['green', 'Address created succesfully', '', 'Ok', `${success}`]}/>}
        </>
    )
}
