import React, {useContext, useState} from 'react';
import { globalContext } from '../globalContext/GlobalContext';
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
                {products.map(product => {
                        return <ProductCard key={product.id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} name={product.name} price={product.price} image={product.image} desc={product.desc} id={product.id} />
                    })
                }
            </div>
            {showingModal && <Modal type={'success'} title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal}/>}
        </>
    )
}
