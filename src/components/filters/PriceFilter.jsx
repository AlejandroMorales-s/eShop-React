import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../globalContext/GlobalContext';

export default function PriceFilter() {
    const options = [
        { id: 1, name: '< $1,000' },
        { id: 2, name: '$1,000 - $1,500' },
        { id: 3, name: '$1,500 - $2,000' },
        { id: 4, name: '$2,000 - $3,000' },
        { id: 5, name: '> $3,000' },
    ];

    const navigate = useNavigate();

    const {setProductsFiltered} = useContext(globalContext);
    const {products} = useContext(globalContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = ( event ) => {
        navigate('/search-products');
        switch(Number(event.target.id)){
            case 1:
                setProductsFiltered(products);
                setProductsFiltered(products.filter(product => product.data.price < 1000));
                break;
            case 2:
                setProductsFiltered(products);
                setProductsFiltered(products.filter(product => product.data.price > 1000 && product.data.price < 1500));
                break;
            case 3:
                setProductsFiltered(products);
                setProductsFiltered(products.filter(product => product.data.price > 1500 && product.data.price < 2000));
                break;
            case 4:
                setProductsFiltered(products);
                setProductsFiltered(products.filter(product => product.data.price > 2000 && product.data.price < 3000));
                break;
            case 5:
                setProductsFiltered(products);
                setProductsFiltered(products.filter(product => product.data.price > 3000));
                break;
            default:
                setProductsFiltered(products);
        };
    };

    const open = () => setIsOpen(!isOpen);
    
    return (
        <div className='relative w-[150px]'>
            <label className='font-medium text-bold dark:text-gray'>Price</label>
            <input 
                onClick={open} 
                type="number" 
                className='shadow-shadow relative w-full border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg font-medium'
            />
            <div className={`${isOpen ? 'absolute' : 'hidden'} flex flex-col gap-1 bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark p-1 w-full z-20 rounded shadow-containersShadow`}>
                {options.map(option => (
                    <p onClick={handleSelectChange} 
                        id={option.id} 
                        key={option.id} 
                        className='p-0.5 text-center cursor-pointer hover:bg-primary dark:hover:bg-primary-light rounded hover:text-white dark:hover:text-boldText font-medium text-text dark:text-gray transition-all ease-in-out delay-50'
                    >
                        {option.name}
                    </p>
                ))}
            </div>
        </div>
    )
}
