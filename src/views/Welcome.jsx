import React, {useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../api';
import { globalContext } from '../components/globalContext/GlobalContext';
import DarkModeToggle from '../components/login/DarkModeToggle';
const happy = require('../assets/happy.png');
const sad = require('../assets/sad.png');

export default function Welcome() {
    const navigate = useNavigate();
    const {setUser} = useContext(globalContext);
    useEffect(() => {
        get('/api/auth/validate')
        .then(({user}) => {
            setUser({type:'LOGIN', user: user});
            navigate("/feed");
        })
        .catch(err => {
          //console.log(err);
        })
    }, [setUser]);

    return (
        <div className='h-[90vh] w-screen flex  items-center justify-center '>
            <div className='bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark p-2 w-fit rounded shadow-shadow'>
                <h1 className='text-center mb-2 font-semibold text-primary text-logo dark:text-primary-light'>eShop</h1>
                <h2 className='text-center text-title font-semibold mb-2 dark:text-white'>You already have an account?</h2>
                <div className='flex gap-2 items-center justify-center'>
                    <Link to='/login' className='cursor-pointer flex flex-col gap-1 hover:shadow-containersShadow rounded hover:translate-x-1 border-2 border-white dark:border-darkBg hover:dark:border-primary-light hover:border-primary hover:-translate-y-1 transition-all ease-in-out delay-50 p-2'>
                        <img src={happy} alt="" />
                        <p className='text-center font-medium text-text dark:text-gray'>I have!</p>
                    </Link>
                    <Link to='/signup' className='cursor-pointer flex flex-col gap-1 hover:shadow-containersShadow rounded hover:translate-x-1 border-2 border-white dark:border-darkBg hover:dark:border-primary-light hover:border-primary hover:-translate-y-1 transition-all ease-in-out delay-50 p-2'>
                        <img src={sad} alt="" />
                        <p className='text-center font-medium text-text dark:text-gray'>Not yet</p>
                    </Link>
                </div>
            </div>
            <DarkModeToggle/>
        </div>
    )
}
