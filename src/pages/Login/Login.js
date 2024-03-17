import React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import Crumb from '../../components/Crumb/Crumb';

import { HttpPost } from '../API/useAuth/auth.api';
const cx = classNames.bind(style);

function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate(); 

    const handleLogin = async (data) => {
        console.log("vao day")
        try {
            const res = await HttpPost('/auth/sign-in', data);
            if(res.data.statuscode === 200) {
                const token = res.data.data.accesstoken;
                sessionStorage.setItem("authToken", token)
                toast.success(res.data.message)
                if(res.data.data.roleName === "Admin") {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
           toast(error.message)
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Crumb title="Login" />
            <form className={cx('form')} autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
                <h2 className={cx('form-title')}>Login</h2>
                <div className={cx('form-group')}>
                    <label htmlFor="username" className={cx('form-label')}>
                        Username
                    </label>
                    <input
                        type="text"
                        className={cx('form-control')}
                        id="username"
                        // value={email}
                        placeholder="Example:Manhcuong"
                        autoComplete="new-password"
                        {...register('username', {
                            required: true,
                           
                        })}
                    />
                    {errors.username && errors.username.type === 'required' && (
                        <span className={cx('error-message')}>Username cannot be empty !</span>
                    )}
                 
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Password *
                    </label>
                    <input
                        type="password"
                        className={cx('form-control')}
                        id="password"
                        // value={password}
                        placeholder="Enter password"
                        autoComplete="off"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 30,
                        })}
                    />
                    {errors.password && errors.password.type === 'required' && (
                        <span className={cx('error-message')}>Password cannot be empty !</span>
                    )}
                </div>

                <div className={cx('form-group-option')}>
                    <div className={cx('gi-more')}>
                        <label className={cx('save-pass')} htmlFor="save-pass">
                            <span>Save Password</span>
                            <input type="checkbox" id="save-pass" />
                            <span className={cx('checkmark')}></span>
                        </label>
                        <a href="/ForgetPass" className={cx('forget-pass')}>
                            Forget your Password
                        </a>
                    </div>
                </div>

                <button className={cx('submit')} type="submit">
                    SIGN IN
                </button>

                <div className={cx('switch')}>
                    <Link to="/register" className={cx('switch-login')}>
                        Or Create An Account
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
