import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Product.module.scss';

import { BsClipboard, BsHeart } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


import { HttpGet } from '~/pages/API/useAuth/auth.api';

const cx = classNames.bind(style);

function Product({ data }) {

 
    return (
        <div className={cx('contents')}>
            <div className={cx('content')} key={data.id}>
                <Link to={`/productDetail/${data._id}`} className={cx('product-card')}>
                    <div className={cx('product-item')}>
                        <div className={cx('product-img')}>
                            <img src={data.images[0]?.imgUrl} alt={data.images[0]?.name} />
                            <BsHeart className={cx('product-favorite')} />
                            {data.sale && data.sale !== '0' && data.sale !== 'null' && (
                                <div className={cx('product-sale')}>SALE</div>
                            )}
                            <div className={cx('product-option')}>
                                <div className={cx('product-option-inner')}>
                                    <div className={cx('option-icon-wrapper')}>
                                        <BsClipboard className={cx('option-icon')} />
                                    </div>
                                    <div className={cx('option-content')}>
                                        <span>+ Quick View</span>
                                    </div>
                                    <div className={cx('option-shuffle-wrapper')}>
                                        <FontAwesomeIcon className={cx('option-shuffle')} icon={faShuffle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-text')}>
                            <span className={cx('product-type')}>{data.type}</span>
                            <span className={cx('product-name')}>{data.productName}</span>
                            <div className={cx('product-price')}>
                                <span>{data.price} đ</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Product;
