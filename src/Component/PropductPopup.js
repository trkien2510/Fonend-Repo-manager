import React, { useState } from 'react';
import '../Styles/ProductPopupStyle.css';
import DeleteProductService from '../Services/DeleteProductService';
import UpdateProductService from '../Services/UpdateProductService';

const ProductPopup = ({ product, closePopup, updateProduct }) => {
    const [name, setName] = useState(product.name);
    const [type, setType] = useState(product.type);
    const [note, setNote] = useState(product.note);
    const [quantity, setQuantity] = useState(product.quantity);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdate = async () => {
        try {
            const result = await UpdateProductService(name, type, note, quantity, localStorage.getItem('username'));
            if (result.error) {
                setError(result.error);
                setSuccess('');
            } else {
                setSuccess('Sản phẩm đã được cập nhật thành công!');
                setError('');
                closePopup();
                window.location.reload();
            }
        } catch (error) {
            setError('Lỗi');
            setSuccess('');
        }
    };

    const handleDelete = async () => {
        try {
            const result = await DeleteProductService(name, localStorage.getItem('username'));
            if (result.error) {
                setError(result.error);
                setSuccess('');
            } else {
                setSuccess('Sản phẩm đã được xóa thành công!');
                setError('');
                closePopup();
                window.location.reload();
            }
        } catch (error) {
            setError('Lỗi');
            setSuccess('');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h1>Thông tin sản phẩm</h1>
                <div className='productname'>
                    <strong>Tên sản phẩm:</strong>
                    <input type="text" value={product.name} disabled></input>
                </div>
                <div className='producttype'>
                    <strong>Loại: </strong>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <div className='productnote'>
                    <strong>Ghi chú: </strong>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <div className='productquantity'>
                    <strong>Số lượng: </strong>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className='popup-action'>
                    <button onClick={handleDelete} className="delete-button">Xóa</button>
                    <button onClick={handleUpdate} className="update-button">Cập nhật</button>
                    <button onClick={closePopup} className="close-popup">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;
