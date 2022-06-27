import React, {useState} from 'react';
import DocumentTitle from 'react-document-title';
import Form from '../components/login/Form';
import SocialMedia from '../components/login/SocialMedia';
import DarkModeToggle from '../components/login/DarkModeToggle';
import Modal from '../components/modals/Modal';

export default function Login() {
    const [showingModal, setShowingModal] = useState(false);
    const [error, setError] = useState({
        isError: false,
        error: []
    });
    return (
        <>
            <DocumentTitle title="Login" />
            <div className='h-[90vh]'>
                <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 h-fit bg-white shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark'>
                    <div>
                        <h1 className='text-center font-semibold text-primary text-logo dark:text-primary-light'>eShop</h1>
                        <p className='text-center font-semibold my-1 text-bold dark:text-gray'>Login</p>
                        <Form setError={setError} setShowingModal={setShowingModal} />
                        <SocialMedia/>
                    </div>
                </div>
            </div>
            <DarkModeToggle/>
            {showingModal && error.isError && <Modal type={'error'} title={'An error ocurred'} desc={error.error} setShowingModal={setShowingModal}/>}
        </>
    )
}
