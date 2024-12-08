import React, { useState } from 'react';
import '../Styles/SignupStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../Services/SignupService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formError = validateForm();
        if (formError) {
            setError(formError);
            return;
        }
        
        const result = await signup(username, password, email);

        if (result.error) {
            setError(result.error);
        } else {
            navigate('/login');
        }
    };

    const validateForm = () => {
        if (username.includes(" ") || password.includes(" ")) {
            return "Tên người dùng và mật khẩu không được chứa khoảng trắng!";
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return "Email phải có định dạng hợp lệ (ví dụ: user@domain.com)";
        }

        return null;
    };

    return (
        <div className="signup_page">
            <div className='signup_form'>
                <div className='signup_title'>
                    <strong>Đăng ký</strong>
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

                <div className='email'>
                    <strong>Email</strong>
                </div>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />

                {error && <div className="error-message">{error}</div>}

                <button className='signup' type='button' onClick={handleSubmit}>
                    <strong>Đăng ký</strong>
                </button>

                <div className='signuptologin'>
                    <span>
                        Bạn đã có tài khoản?
                        <Link to="/login">
                            <span><u>đăng nhập tại đây</u></span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
};

export default Signup;