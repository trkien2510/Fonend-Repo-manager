import React, { useState } from 'react';
import '../Styles/UploadProductPopupStyle.css'
import UploadProductService from '../Services/UploadProductService';

const UploadProductPopup = ({ closePopup }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [note, setNote] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUploadProduct = async () => {
        if (!name || !type) {
            return;
        }

        const quantityValue = quantity === '' ? 0 : quantity;

        try {
            const result = await UploadProductService(name, type, note, quantityValue, localStorage.getItem('username'));
            if (result.error) {
                setError(result.error);
                setSuccess('');
            } else {
                setSuccess('Sản phẩm đã được thêm thành công!');
                setError('');
                closePopup();
                window.location.reload();
            }
        } catch (error) {
            setError('Lỗi khi thêm sản phẩm');
            setSuccess('');
        }
    };

    return (
        <div className="upload-popup-overlay">
            <div className="upload-popup-content">
                <h1>Thông tin sản phẩm</h1>
                <div className='uploadproductname'>
                    <strong>Tên sản phẩm:</strong>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='uploadproducttype'>
                    <strong>Loại: </strong>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>

                <div className='uploadproductnote'>
                    <strong>Ghi chú: </strong>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <div className='uploadproductquantity'>
                    <strong>Số lượng: </strong>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <div className='upload-action'>
                    <button onClick={handleUploadProduct} className="upload-button">Thêm</button>
                    <button onClick={closePopup} className="close-upload-popup">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default UploadProductPopup;
