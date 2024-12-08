import React, { useState } from 'react';
import '../Styles/LoginStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import login from '../Services/LoginService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const result = await login(username, password);

        if (result.error) {
            setError(result.error);
        } else {
            navigate('/');
        }
    };

    return (
        <div className='login_page'>
            <div className='login_form'>
                <div className='logintitle'>
                    <strong>Đăng nhập</strong>
                </div>

                <hr className='hr' />

                <div className='username'>
                    <strong>Tên người dùng</strong>
                </div>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Tên người dùng'
                />

                <div className='password'>
                    <strong>Mật khẩu</strong>
                </div>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Mật khẩu'
                />

                <button className='login' type='button' onClick={handleLogin}>
                    <strong>Đăng nhập</strong>
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className='logintosignup'>
                    Bạn chưa có tài khoản?
                    <Link to='/signup'>
                        <u>Đăng ký</u>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;