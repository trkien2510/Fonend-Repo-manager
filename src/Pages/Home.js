import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/HomeStyle.css';
import ProductItem from '../Component/ProductItem';
import GetProductsService from '../Services/GetProductsService';
import UploadProductPopup from '../Component/UploadProductPopup';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accMenu, setAccMenu] = useState(false);

    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        const storedUsername = localStorage.getItem('username');

        if (userToken && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            fetchProducts(storedUsername);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchProducts = async (username) => {
        const result = await GetProductsService(username);
        if (result.error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', result.error);
        } else {
            setProducts(result.data || []);
            setFilteredProducts(result.data || []);
        }
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        if (searchValue === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    };

    const handleAddItemClick = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className='home'>
            <div className='topcontent'>
                <input
                    className='search'
                    placeholder='Nhập tên sản phẩm'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {isLoggedIn ? <MyAcc /> : <Account />}
            </div>
            <div className='bottomcontent'>
                <div className='table'>
                    <div className='tabletitle'>
                        <span>STT</span>
                        <span>Tên sản phẩm</span>
                        <span>Loại</span>
                        <span>Ghi chú</span>
                        <span>Số lượng</span>
                        <span></span>
                    </div>
                    <product className='listproduct'>
                        {isLoggedIn ? (
                            <button onClick={handleAddItemClick} className='additem'>+</button>
                        ) : (
                            <div></div>
                        )}
                        {isLoggedIn ? (
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductItem
                                        key={product.id}
                                        stt={index + 1}
                                        name={product.name}
                                        type={product.type}
                                        note={product.note}
                                        quantity={product.number}
                                    />
                                ))
                            ) : (
                                <div><strong>Không có sản phẩm nào.</strong></div>
                            )
                        ) : (
                            <div><strong>Đăng nhập để xem sản phẩm</strong></div>
                        )}
                    </product>
                </div>
            </div>
            {isPopupOpen && <UploadProductPopup closePopup={closePopup} fetchProducts={fetchProducts} />}
        </div>
    );

    function Account() {
        return (
            <div className="account">
                <Link to="/signup">
                    <button id="btn_signup" type="button">Đăng ký</button>
                </Link>
                <Link to="/login">
                    <button id="btn_login" type="button">Đăng nhập</button>
                </Link>
            </div>
        );
    }

    function MyAcc() {
        return (
            <div className="myaccount">
                <button id="btn_account" type="button" onClick={() => setAccMenu(!accMenu)}>
                    <img src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} width="50px" height="50px" alt="" />
                </button>

                {accMenu && (
                    <div className="account-menu">
                        <Link to="/profile">
                            <button className="menu-option">Thông tin cá nhân</button>
                        </Link>
                        <button className="menu-option" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        );
    }
};

export default Home;
