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

    return (
        <>
            <div className='grid relative grid-cols-1 sm:grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto'>
                {products.length > 0 ?
                    <>
                        {products.map(prod => {
                            return <ProductCard key={prod._id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} />
                        })}
                    </>
                :   
                    <Loader/>
                }
            </div>
            {showingModal && <Modal type={'success'} title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal}/>}
        </>
    )
}
