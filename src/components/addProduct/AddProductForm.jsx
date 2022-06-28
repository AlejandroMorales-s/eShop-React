import React, {useRef, useState} from 'react'
import { post } from '../../api';
import Modal from '../modals/Modal';

export default function AddProductForm() {

    //* States
    const [showingModal, setShowingModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: "",
        message: ""
    });

    //* Refs
    const name = useRef();
    const images = useRef();
    const stock = useRef();
    const price = useRef();
    const description = useRef();

    const addProduct = (e) => {
        e.preventDefault();
        post('/api/products', {
            name: name.current.value,
            images: images.current.value.split(", "),
            stock: stock.current.value,
            price: price.current.value,
            description: description.current.value
        })
        .then(res => {
            setShowingModal(true);
            setModalMessage({
                title: `${name.current.value} added successfully`,
                message: "Product has been added successfully"
            });
        })
        .catch(err => console.log(err)); 
    }
    return (
        <>
            <h2 className='text-center m-3 text-title text-boldText font-semibold dark:text-gray'>Add Product</h2>
            <form onSubmit={addProduct} className='bg-white shadow-containersShadow p-4 border-2 border-gray dark:border-gray-grayDark rounded flex flex-col m-auto w-95 max-w-70 dark:bg-darkBg'>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-gray text-boldText'>Name</label>
                    <input ref={name} name='name'
                        className='border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg' 
                        type="text" 
                    />
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-gray text-boldText'>Images</label>
                    <input ref={images} name='images'
                        className='border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg' 
                        type="text" placeholder='URLs separated by commas' 
                    />
                </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-gray text-boldText'>Stock</label>
                        <input ref={stock} name='stock'
                            className='border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg' 
                            type="number" placeholder='1' 
                            min='1'
                        />
                    </div>
                    <div className='flex flex-col gap-y-0.5 mb-1.5'>
                        <label className='text-bold font-medium dark:text-gray text-boldText'>Price</label>
                        <input ref={price} name='price'
                            className='border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg' 
                            type="number" placeholder='$10.00' 
                            min='1'
                            step='.01'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-0.5 mb-1.5'>
                    <label className='text-bold font-medium dark:text-gray text-boldText' htmlFor="">Description)</label>
                    <textarea ref={description} name='description'
                        className='border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg' 
                        type="text" placeholder='For example, "Do not forget to bring your passport"' 
                    />
                </div>
                <button className={`shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`} type="submit">Add product</button>
            </form>
            {showingModal && <Modal type={'success'} title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal}/>}
        </>
    )
}
