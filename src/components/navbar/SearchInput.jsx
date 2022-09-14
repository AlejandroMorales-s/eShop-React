import React, {useContext, useRef, useState} from 'react'
import { globalContext } from '../globalContext/GlobalContext';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
    //* Context
    const {products} = useContext(globalContext);
    const {setProductsFiltered} = useContext(globalContext);
    
    const productsName = products;
    
    //* State
    const [charactersInInput, setCharactersInInput] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [query, setQuery] = useState('')
    
    const inputRef = useRef();

    const navigate = useNavigate();
    
    //* Names of products filtered
    const filteredProductsName = query === '' ? productsName : productsName.filter((product) => product.data.name.toLowerCase().includes(query.toLowerCase().trim()));

    //* Clear input field 
    const clearInput = () => {
        inputRef.current.value = ""; 
        setCharactersInInput(0);
    };
    
    //* Search products 
    const searchProduct = (e) => {
        setQuery(inputRef.current.value);
        setShowDropdown(true);
        if (e.key === "Enter") {
            setProductsFiltered(products.filter(product => product.data.name.toLowerCase().includes(inputRef.current.value.toLowerCase().trim())));
            setShowDropdown(false);
            navigate('/search-products');
        };
    };
    
    //* setDropdownValue
    const setDropdownValue = (e) => {
        inputRef.current.value = e.target.outerText;
        setShowDropdown(false);
        setProductsFiltered(products.filter(product => product.data.name.toLowerCase().includes(inputRef.current.value.toLowerCase().trim())));
        navigate('/search-products');
    };

    return (
        <>
            <div className='w-90 max-w-55 mx-2 h-fit relative'>
                <input 
                    ref={inputRef} 
                    onKeyUp={(e) => searchProduct(e)} 
                    onChange={(e) => setCharactersInInput(e.target.value.length)} 
                    className='relative font-medium dark:text-gray px-4 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg' 
                    type="text" placeholder='What are you looking for today?'
                />
                <AiOutlineSearch className='absolute left-[5px] top-[5px] text-[30px] text-text dark:text-gray'/>
                <AiOutlineClose onClick={clearInput} className={`${charactersInInput > 0 ? 'absolute' : 'hidden'} right-[5px] top-[10px] cursor-pointer text-[17.5px] text-text dark:text-gray`}/>
                <div id='input-dropdown' className={`${charactersInInput > 0 && showDropdown ? 'absolute' : 'hidden'} w-full p-1 bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark rounded flex flex-col gap-1 max-h-[275px] overflow-auto`}>
                    {filteredProductsName.length > 0 ? 
                        <>
                            {filteredProductsName.map((product) => (
                                <div onClick={setDropdownValue} key={product.id} className='flex p-1 justify-between items-center cursor-pointer hover:bg-primary dark:hover:bg-primary-light rounded hover:text-white dark:hover:text-boldText font-medium text-text dark:text-gray transition-all ease-in-out delay-50'>
                                    <p>{product.data.name}</p>
                                </div>
                            ))}
                        </>
                    :
                        <p className='font-medium text-center text-text dark:text-gray'>Not found</p>
                    }
                </div>
            </div>
        </>
    )
}
