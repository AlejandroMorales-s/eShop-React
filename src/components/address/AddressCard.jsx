import React, {useContext} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
import { useNavigate } from 'react-router-dom';

export default function AddressCard({currentAddress}) {
  const navigate = useNavigate();
  const {shoppingAddress, setShoppingAddress} = useContext(globalContext);
  const {addresses, setAddresses} = useContext(globalContext);

  const deleteAddress = () => {
    const address = addresses.filter(address => address.id !== currentAddress.id);
    setAddresses(address);
  }

  const setAddress = () => {
    setShoppingAddress(currentAddress)
    navigate('/feed');
  }

  return (
    <div className='border-2 gap-1 rounded flex flex-col justify-between items-center border-gray p-2 hover:shadow-containersShadow bg-white h-[400px] w-100 hover:border-primary dark:hover:border-primary-ligth hover:-translate-y-0.5 transition-all ease-in-out delay-50'>
        <div className='h-fit w-100 flex flex-col gap-1.5'>
            <h3 className='text-subtitle text-center font-medium'>{`${currentAddress.streetAndNumber}, ${currentAddress.country}`}</h3>
            <p className='text-text'><span className='font-medium text-boldText'>Name:</span> {currentAddress.name}</p>
            <p className='text-text'><span className='font-medium text-boldText'>Postal code:</span> {currentAddress.postalCode}</p>
            <p className='text-text'><span className='font-medium text-boldText'>Phone number:</span> {currentAddress.phoneNumber}</p>
            {currentAddress.instructions !== '' && 
              <p className='text-text'><span className='font-medium text-boldText'>Instructions:</span><br/>{currentAddress.instructions}</p>
            }
        </div>
        <div className='flex flex-col gap-1'>
          {shoppingAddress !== currentAddress && 
            <button className='shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-ligth dark:text-darkBg dark:border-primary-ligth dark:hover:bg-transparent dark:hover:text-primary-ligth' onClick={setAddress}>Set address</button>
          }
          <button onClick={deleteAddress} className='shadow-shadow px-2 py-1 bg-red text-white font-semibold rounded border-2 border-red transition-all hover:bg-transparent hover:text-red dark:bg-primary-ligth dark:text-darkBg dark:border-red dark:hover:bg-transparent dark:hover:text-red'>Delete address</button>
        </div>
    </div>
  )
}
