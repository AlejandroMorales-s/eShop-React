import React, {useContext, useState} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
import Loader from '../loader/Loader';
import Modal from '../modals/Modal';
import ProductCard from '../productCard/ProductCard';

export default function Products() {
    const {products} = useContext(globalContext);
    const [showingModal, setShowingModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: "",
        message: ""
    });

    const categories = [
        {
            name: 'Living Room',
            category: 'living room'
        },
        {
            name: 'Bedroom',
            category: 'bedroom'
        },
        {
            name: 'Bathroom',
            category: 'bathroom'
        },
        {
            name: 'Kitchen',
            category: 'kitchen'
        },
    ]
    
    return (
        <>
            <div>
                {products.length > 0 ?
                    <>
                        <div className='w-95 max-w-[1000px] m-auto'> 
                            {categories.map(categoryDiv => {
                                const {name, category} = categoryDiv
                                return <div key={name}>
                                    <h2 className='text-center font-semibold text-title dark:text-gray m-3'>{name}</h2>
                                    <div className='flex relative gap-2 w-full m-auto overflow-x-auto py-1 horizontal-dropdown'>
                                        {products.map(prod => 
                                            prod.data.category.toLowerCase() === category && 
                                            <ProductCard key={prod.id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} />
                                        )}
                                    </div>
                                </div>
                            })}
                        </div>
                    </>
                :   
                    <Loader/>
                }
            </div>
            {showingModal && <Modal type={'success'} title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal}/>}
        </>
    )
}
