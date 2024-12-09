import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ProfileStyle.css';
import UpdateUserService from '../Services/UpdateUserService'

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('username')) {
            navigate('/Signup');
        } else {
            setUsername(localStorage.getItem('username') || '');
            setEmail(localStorage.getItem('email') || '');
        }
    }, [navigate]);

    const handleUpdateProfile = async () => {
        if (password == '' || newPassword == '' || confirmNewPassword =='') {
            alert('Mật khẩu không được để trống');
            return;
        }
        
        if (newPassword.includes(' ')) {
            alert('Mật khẩu không được chứa khoảng trắng!');
            return;
        }
    
        if (newEmail.includes(' ')) {
            alert('Email không được chứa khoảng trắng!');
            return;
        }
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (newEmail && !emailRegex.test(newEmail)) {
            alert('Email không hợp lệ!');
            return;
        }
    
        if (newPassword !== confirmNewPassword) {
            alert('Mật khẩu mới và mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const result = await UpdateUserService(username, password, newPassword, email, newEmail);
            if (result.error) {
                alert(`Lỗi cập nhật: ${result.error}`);
            } else {
                alert('Cập nhật thông tin thành công.');
                if (newEmail) {
                    localStorage.setItem('email', newEmail);
                }
                navigate('/');
            }
        } catch (error) {
            console.error('Lỗi cập nhật hồ sơ:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className='profile_page'>
            <div className='update_profile_form'>
                <div className='profiletitle'>
                    <strong>Thông tin người dùng</strong>
                </div>

                <hr className='hr' />

                <div className='username'>
                    <strong>Tên người dùng</strong>
                </div>
                <input
                    type='text'
                    value={username}
                    placeholder='Tên người dùng'
                    disabled
                />

                <div className='password'>
                    <strong>Mật khẩu</strong>
                </div>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Mật khẩu'
                    autoComplete='new-password'
                />

                <div className='password'>
                    <strong>Mật khẩu mới</strong>
                </div>
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Mật khẩu mới'
                    autoComplete='new-password'
                />

                <div className='password'>
                    <strong>Nhập lại mật khẩu mới</strong>
                </div>
                <input
                    type='password'
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder='Nhập lại mật khẩu'
                    autoComplete='new-password'
                />

                <div className='email'>
                    <strong>Email</strong>
                </div>
                <input
                    type='email'
                    value={email}
                    placeholder='Email'
                    disabled
                />

                <div className='email'>
                    <strong>Email mới</strong>
                </div>
                <input
                    type='email'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder='New email'
                />

                <button className='update_profile' type='button' onClick={handleUpdateProfile}>
                    <strong>Cập nhật</strong>
                </button>

                <button className='go_home' type='button' onClick={handleGoHome}>
                    <strong>Trở về trang chủ</strong>
                </button>
            </div>
        </div>
    );
};

export default Profile;
