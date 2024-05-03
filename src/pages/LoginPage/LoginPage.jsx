import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaLockOpen } from "react-icons/fa";

const LoginPage = ({ handlerUser }) => {
const [isPasswordShow, setPasswordShow] = useState(false)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handlerUser({ name, password });
        navigate('/')
    };
    
    return (
        <div className='login-container'>
            <div className={`wrapper active`}>
                <div className='form-box login'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>

                        <div className='input-box'>
                            <input
                                type='text'
                                placeholder='Username'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <FaUser className='icon' />
                        </div>

                        <div className='input-box'>
                            <input
                                type={isPasswordShow?'text':'password'} 
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {!isPasswordShow && <FaLock className='icon' onClick={()=> setPasswordShow(true)} />}


                            {isPasswordShow && <FaLockOpen className='icon' onClick={()=> setPasswordShow(false)} />}
                            
                        </div>

                        <div className='remember-forgot'>
                            <label>
                                <input className='checkbox' type='checkbox' />
                               Remember me
                                </label>
                           <div className='forgot-password-bg'>
                           <Link to='/forgot-password'>Forgot password?</Link>
                           </div>
                       
                        </div>

                        <button type='submit'>Login</button>

                        <div className='register-link'>
                            <p>
                                Don't have an account? <Link to='/register'>Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;