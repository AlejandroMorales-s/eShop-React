import React, {useContext, useState} from 'react';
import ReactDocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/breadcrumbTrail/Breadcrumb';
import Navbar from '../components/navbar/Navbar';
import { BsPlusCircle } from 'react-icons/bs';
import { globalContext } from '../components/globalContext/GlobalContext';
import Card from '../components/myCards/Card';
import Modal from '../components/modals/Modal';

export default function MyCards() {
    const {cards} = useContext(globalContext);
    const [showingModal, setShowingModal] = useState(false);
    const breadcrumb = [
        {
            link:'/account',
            text:'My account'
        },
        {
            link:'/account/my-cards',
            text:'My cards'
        }
    ];
    return (
        <>
            <ReactDocumentTitle title='My cards'/>
            <Navbar/>
            <Breadcrumb array={breadcrumb}/>
            <h2 className='text-center font-semibold text-title dark:text-gray m-3'>My cards</h2>
            <div className='h-[60vh]'>
                <div className='shadow-containersShadow w-95 max-w-[1000px] border-2 bg-white dark:bg-darkBg border-gray flex flex-col gap-2 dark:border-gray-grayDark rounded p-2 m-auto'>
                    <Link to='/account/add-card'>
                        <div className='border-3 h-[100px] w-full rounded flex gap-2  items-center border-dashed border-gray p-2 hover:shadow-containersShadow bg-white dark:bg-darkBg dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-light hover:-translate-y-0.5 transition-all ease-in-out delay-50'>
                            <BsPlusCircle className='text-[65px] text-[#bababa]'/>
                            <h3 className='text-[#bababa] text-subtitle text-center font-medium'>Add Card</h3>
                        </div>
                    </Link>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            component={'MyCards'}
                            setShowingModal={setShowingModal}
                        />
                    ))}
                </div>
            </div>
            {showingModal && <Modal type={'success'} title={'Card deleted'} desc={'Card deleted successfully'} setShowingModal={setShowingModal}/>}
        </>
    )
}
