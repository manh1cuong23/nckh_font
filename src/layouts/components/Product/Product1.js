import React, { useEffect } from 'react';
import { useState } from 'react';

import classNames from 'classnames/bind';
import style from './Product1.module.scss';

import img1 from '~/assets/imgs/women-large.jpg';

import SliderProduct from '~/layouts/components/Product/SliderProduct/SliderProduct';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import axios from 'axios';

const cx = classNames.bind(style);

const listProduct = ['Clothing', 'HandBag', 'Shoes', 'Accessories'];

function Product1(props) {
    const [productActive, setProductActive] = useState(0);

    const [product, setProduct] = useState('Clothing');

    const [productTag, setProductTag] = useState([]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product')}>
                <div className={cx('product-left')}>
                    <img src={img1} alt="women" />
                    <div className={cx('intro')}>Restaurant</div>
                    <span className={cx('more')}>Discover More</span>
                </div>
                <div className={cx('product-right')}>
                    <h1>TAKI RESTAURANT</h1>
                    <ul>
                        <li>Chào mừng quý khách đến với nhà hàng sang trọng của chúng tôi, nơi bạn có thể tận hưởng những món ăn ngon đẳng cấp được chế biến từ những nguyên liệu tươi ngon nhất.</li>
                        <li>Với không gian lịch lãm và dịch vụ chuyên nghiệp, nhà hàng của chúng tôi là điểm đến lý tưởng cho những bữa tiệc hoặc buổi hẹn quan trọng.</li>
                        <li>Đội ngũ đầu bếp tài năng của chúng tôi luôn tạo ra những món ăn độc đáo và phong phú, đáp ứng mọi sở thích ẩm thực của quý khách.</li>
                        <li>Với menu đa dạng từ các món ăn Âu, Á đến hải sản tươi sống, chúng tôi cam kết mang đến trải nghiệm ẩm thực tuyệt vời nhất cho mọi thực khách.</li>
                        <li>Hãy đến và trải nghiệm không gian ấm áp, sang trọng cùng với hương vị tuyệt vời tại nhà hàng của chúng tôi - nơi thăng hoa mọi giác quan của bạn.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Product1;
