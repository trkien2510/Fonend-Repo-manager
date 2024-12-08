import React, {useState} from 'react';
import '../Styles/ProductItem.css'
import PropductPopup from './PropductPopup';

const ProductItem = ({ stt, name, type, note, quantity, username }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleMoreClick = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className='item'>
            <span className='order'>{stt}</span>
            <span className='name'>{name}</span>
            <span className='type'>{type}</span>
            <span className='note'>{note}</span>
            <span className='quantity'>{quantity}</span>
            <button className='more' onClick={handleMoreClick}>
                <img src='https://cdn-icons-png.flaticon.com/512/512/512222.png' width='30px' height='30px' alt=''></img>
            </button>

            {isPopupOpen && (
                <PropductPopup product={{ name, type, note, quantity, username}} closePopup={closePopup} />
            )}
        </div>
    );
};

export default ProductItem;