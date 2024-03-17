import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './Slider.module.scss';
import img1 from '~/assets/imgs/bubu.jpg';
import img2 from '~/assets/imgs/bun.jpg';
import img3 from '~/assets/imgs/comrang.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import "./Swiper.css";

const cx = classNames.bind(style);
const imgs = [img1,img2,img3]
function Slider() {
    return (
        <>
            <Swiper className={cx('mySwiper')} pagination={true} navigation={true} autoplay={{delay: 5000, disableOnInteraction: true,}} modules={[Pagination, Navigation, Autoplay]}>
                {imgs.map((item,index)=>{
                    console.log("item",item)
                    return (<SwiperSlide key={index}> 
                        {' '}
                        <div className={cx('slide-1')}>
                            <img className={cx('banner')} src={item} alt="img1" />
                            <div className={cx('slider')}>
                               
                                <div className={cx('slider-right')}>
                                    <div className={cx('circle-sale')}>
                                        <h2>TOP SALE</h2>
                                    </div>
                                </div>
                                <Link to="/shop" className={cx('btn')}>
                                     ORDER NOW
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>)
                })}
                
             
            </Swiper>
        </>
    );
}

export default Slider;
