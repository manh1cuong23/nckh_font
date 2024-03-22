import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { BsFillTelephoneFill, BsHeart, BsClipboardPlus } from 'react-icons/bs';
import { ImFacebook, ImPinterest } from 'react-icons/im';
import { RiInstagramFill } from 'react-icons/ri';
import { FaTiktok, FaUser } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import style from './Header.module.scss';
import Search from '~/components/Search/Search';
import img1 from '~/assets/imgs/women-4.jpg';
import useAuthStore from '~/hooks/useAuthStore';
import { HttpGet } from '~/pages/API/useAuth/auth.api';


const cx = classNames.bind(style);

function Header() {
    const user = useAuthStore((state) => state.user);
    const [cartCount,setCartCount] = useState(0)
    console.log('user',user)
    const callApi=async ()=>{
        const rs = await HttpGet('/cart/getCount');
        console.log('rsvãc',rs)
        if(rs){
        setCartCount(rs.data)
        }
    }
    useEffect(()=>{
        callApi()
    },[cartCount])
    const handleLogout = ()=>{
        sessionStorage.removeItem('accesstoken');
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-top')}>
                <div className={cx('container')}>
                    <div className={cx('header-left')}>
                        <div className={cx('email')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                            <span className={cx('mail-address')}>ndt13102003@gmail.com</span>
                        </div>
                        <div className={cx('phone')}>
                            <BsFillTelephoneFill className={cx('icon')} />
                            <span>+84 346.751.314</span>
                        </div>
                    </div>
                    <div className={cx('header-right')}>
                        <div className={cx('social')}>
                            <a
                                href="#!"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ImFacebook />
                            </a>
                            <a href="#!">
                                <RiInstagramFill />
                            </a>
                            <a href="#!">
                                <ImPinterest />
                            </a>
                            <a href="#!">
                                <FaTiktok />
                            </a>
                        </div>
                        <div className={cx('social-icon')}>
                            <IoShareSocialOutline />
                        </div>
                       
                        <div className={cx('login')}>
                            <FaUser />
                            {user? <span>
                                <Link to="/login">Login</Link>
                            </span>:
                            <span>
                            <Link onClick={handleLogout} to="/login">logout</Link>
                        </span>
                            }
                            
                        </div>
                        <div className={cx('avatar--user')}>
                            <Link to="/profile">
                                <img src={img1} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('header-bot')}>
                <div className={cx('inner-header')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src="https://preview.colorlib.com/theme/fashi/img/logo.png" alt="" />
                        </Link>
                    </div>
                    <Search />
                    <div className={cx('cart')}>
                        <Link to="/favourite" className={cx('heart')}>
                            <BsHeart />
                            <span className={cx('cart-number')}>
                                <div>1</div>
                            </span>
                        </Link>
                        <Link to="/cart" className={cx('cart-icon')}>
                            <BsClipboardPlus />
                            <span className={cx('cart-number')}>
                                <span>{cartCount}</span>
                            </span>
                        </Link>
                        <div className={cx('price')}>$150.00</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
