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
            <div>
                {products.length > 0 ?
                    <>
                        <div className='w-95 max-w-[1000px] m-auto'> 
                            {/* Living Room */}
                            <div >
                                <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Living Room</h2>
                                <div className='flex relative gap-2 w-full m-auto overflow-x-auto py-1 horizontal-dropdown'>
                                    {products.map(prod => 
                                        prod.name.includes('Curtains') || prod.name.includes('Pillow') ? 
                                        <ProductCard key={prod._id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} /> 
                                        : 
                                        null
                                        )}
                                </div>
                            </div>
                            {/* Bedroom */}
                            <div>
                                <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Bedroom</h2>
                                <div className='flex relative gap-2 w-full m-auto overflow-x-auto py-1 horizontal-dropdown'>
                                    {products.map(prod => 
                                        prod.name.includes('Bed') ? 
                                            <ProductCard key={prod._id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} /> 
                                        : 
                                            null
                                    )}
                                </div>
                            </div>
                            {/* Bathroom */}
                            <div>
                                <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Bathroom</h2>
                                <div className='flex relative gap-2 w-full m-auto overflow-x-auto py-1 horizontal-dropdown'>
                                    {products.map(prod => 
                                        prod.name.includes('Bath') || prod.name.includes('Mirror') ? 
                                            <ProductCard key={prod._id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} /> 
                                        : 
                                            null
                                    )}
                                </div>
                            </div>
                            {/* Kitchen */}
                            <div>
                                <h2 className='text-center font-semibold text-title dark:text-gray m-3'>Kitchen</h2>
                                <div className='flex relative gap-2 w-full m-auto overflow-x-auto py-1 horizontal-dropdown'>
                                    {products.map(prod => 
                                        prod.name.includes('Kitchen') ? 
                                            <ProductCard key={prod._id} setShowingModal={setShowingModal} setModalMessage={setModalMessage} product={prod} /> 
                                        : 
                                            null
                                    )}
                                </div>
                            </div>
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
