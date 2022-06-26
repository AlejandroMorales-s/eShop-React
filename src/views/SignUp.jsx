import React, {useState} from 'react';
import DocumentTitle from 'react-document-title';
import DarkModeToggle from '../components/login/DarkModeToggle';
import SocialMedia from '../components/login/SocialMedia';
import Modal from '../components/modals/Modal';
import Form from '../components/signUp/Form';

export default function SignUp() {
    const [showingModal, setShowingModal] = useState(false);
    const [error, setError] = useState({
        isError: false,
        error: []
    });
    return (
        <>
            <DocumentTitle title="Sign Up" />
                <div className=' border-gray border-2 rounded w-95 max-w-65 m-auto p-2 h-fit bg-white shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark'>
                    <div>
                        <h1 className='text-center font-semibold text-primary text-logo dark:text-primary-light'>LOGO</h1>
                        <p className='text-center font-semibold my-1 text-bold dark:text-gray'>Sign Up</p>
                        <Form setError={setError} setShowingModal={setShowingModal}/>
                        <SocialMedia/>
                    </div>
                </div>
            <DarkModeToggle/>
            {showingModal && error.isError && <Modal type={'error'} title={'An error ocurred'} desc={error.error} setShowingModal={setShowingModal}/>}
        </>
    )
}
