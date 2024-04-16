import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { HttpPost } from '../API/useAuth/auth.api';
import Crumb from '~/components/Crumb/Crumb';

const cx = classNames.bind(style);

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

   

    const handleSignUp = async (data) => {
        const res = await HttpPost('/auth/sign-up', data)
        if(res) {
            if(res.data.statuscode === 200) {
                toast.success(res.data.message, {
                    pauseOnHover: false,
                });
            } else {
                toast.error(res.data.message, {
                    pauseOnHover: false,
                })
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Crumb title="Register" />
            <form className={cx('form')} onSubmit={handleSubmit(handleSignUp)}>
                <h2 className={cx('form-title')}>Register</h2>
                <div className={cx('form-group')}>
                    <label htmlFor="username" className={cx('form-label')}>
                        Username
                    </label>
                    <input
                        type="text"
                        className={cx('form-control')}
                        placeholder="Example: username"
                        {...register('username', {
                            required: true,
                            
                        })}
                    />
                    {errors.username && errors.username.type === 'required' && (
                        <span className={cx('error-message')}>username cannot be empty !</span>
                    )}
                  
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Password *
                    </label>
                    <input
                        type="password"
                        className={cx('form-control')}
                        placeholder="Entered password"
                        autoComplete="on"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 30,
                        })}
                    />
                    {errors.password && errors.password.type === 'required' && (
                        <span className={cx('error-message')}>Password cannot be empty !</span>
                    )}
                    {errors.password && errors.password.type === 'minLength' && (
                        <span className={cx('error-message')}>Weak password</span>
                    )}
                    {errors.password && errors.password.type === 'maxLength' && (
                        <span className={cx('error-message')}>Password up to 30 characters</span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="passwordAgain" className={cx('form-label')}>
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        className={cx('form-control')}
                        placeholder="Re-entered password"
                        autoComplete="on"
                        {...register('passwordAgain', {
                            required: true,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return 'Your passwords does not match!';
                                }
                            },
                        })}
                    />
                    {errors.passwordAgain && errors.passwordAgain.type === 'required' && (
                        <span className={cx('error-message')}>Password again can not be empty !</span>
                    )}
                    {errors.passwordAgain && errors.passwordAgain.type === 'validate' && (
                        <span className={cx('error-message')}>Confirm password does not match !</span>
                    )}
                </div>

                <button className={cx('submit')}>REGISTER</button>

                <div className={cx('switch')}>
                    <Link to="/login" className={cx('switch-login')}>
                        Or Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
