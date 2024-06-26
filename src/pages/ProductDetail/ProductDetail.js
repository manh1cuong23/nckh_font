import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './ProductDetail.module.scss';
import Crumb from '~/components/Crumb/Crumb';
import axios from 'axios';
import { Link } from 'react-router-dom';

import img1 from '~/assets/imgs/women-4.jpg';
import img from '~/assets/imgs/product.jpg';

import { AiFillStar, AiOutlineQuestionCircle, AiOutlineFileProtect } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { TbArrowBackUp } from 'react-icons/tb';
import { HttpGet, HttpPost } from '../API/useAuth/auth.api.js';
import PurePanel from 'antd/es/tooltip/PurePanel';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import io from "socket.io-client";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
// import { socket } from '~/soket';
import avatar from '~/assets/imgs/avatar_default.jpg'
import Comment from '~/components/CommentProductdetail/Comment';
const cx = classNames.bind(style);
function ProductDetail() {
    // Lay API san pham chi tiet
    const sendMessage = () => {
        socket.emit("send_message", { d:"jjijiji"});
      };
    const param = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [product, setProduct] = useState([]);
    const [socket,setSocket] = useState(null)
    const check = sessionStorage.getItem("accesstoken")
   
    const callApi = async () => {
        
        const rs = await HttpGet(`/product/detail?id=${param.id}`)

        if (rs.status === 200) {
            setProductDetail(rs.data);
            setProduct(rs.data);
        }
    };

    useEffect(() => {
        callApi();
    }, []);


    console.log(productDetail);
    // Tang - Giam san pham
    const [productQuantity, setProductQuantity] = useState(1);

    const handleQuantity = (e) => {
        setProductQuantity(e.target.value);
    };
    const handleIncrease = useCallback(() => {
        // sendMessage()
        setProductQuantity(productQuantity + 1);
      }, [productQuantity]);
   
    const handleAddToCard = async()=>{
        console.log("check",productDetail)
        const data = {productId:productDetail._id,quantity:productQuantity}
        try{
            const res = await HttpPost('/cart/create', data);
            if(res.status ==200){
                toast.success("Thêm sản phẩm vào giỏ hàng thành công")
            }else{
                toast.error("Thêm sản phẩm vào giỏ hàng thất bại")

            }
        }catch(err){
            console.log(err)
        }
       
    }
    console.log("check detal",productDetail)
    const handleReduce = useCallback(() => {
        if (productQuantity === 1) {
            setProductQuantity(1);
        } else {
            setProductQuantity(productQuantity - 1);
        }
      }, [productQuantity]);
   

    // Lay input value & day sang checkout
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate({
            pathname: '/checkOut',
            state: { productQuantity },
        });
    };

    console.log(productQuantity);
    console.log('check acc',sessionStorage.getItem("accesstoken"))
    return (
        <div className={cx('wrapper')}>
            {productDetail && (
                <div className={cx('container')}>
                    <Crumb title="Shop | Product Detail&nbsp;" text={productDetail.productName} />
                    <div className={cx('header')}>
                        <div className={cx('left-header')}>
                            <div className={cx('imgs')}>
                                <div className={cx('img-main')}>
                                    <img src={productDetail.images ? productDetail.images[0]?.imgUrl : img } alt="img-main" />
                                </div>
                                <div className={cx('img-extra')}>
                                    {/* {productDetail.images && productDetail.images.forEach(element => {
                                        <img src={element.imgUrl} alt="img-extra" />
                                    })} */}
                                </div>
                            </div>
                        </div>
                        <div className={cx('right-header')}>
                            <div className={cx('product-name')}>
                                <span>{productDetail.productName}</span>
                            </div>
                            <div className={cx('product-info')}>
                                <div className={cx('product-star')}>
                                    <span>{productDetail.EvaluteCount}</span>
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                                <span className={cx('line')}>|</span>
                                <div className={cx('product-rate')}>
                                    <span>{productDetail.EvaluteCount}</span>
                                </div>
                                <span className={cx('line')}>|</span>
                                <div className={cx('product-sold')}>
                                    <span>{productDetail.views}</span>
                                    <span>
                                        Sold:
                                        
                                        <span className={cx('sold')}>{productDetail.solid}</span>
                                    </span>
                                </div>
                            </div>
                            <div className={cx('product-price')}>
                                <div className={cx('cost')}>
                                    <span>{parseFloat(productDetail.price)} đ</span>
                                </div>
                                <div className={cx('cost-sale')}>
                                    <span>
                                        {parseFloat(productDetail.price)}{' '}
                                        đ
                                    </span>
                                </div>
                            </div>
                            <div className={cx('product-ship')}>
                                <div className={cx('ship-title')}>
                                    <span>Shipping</span>
                                </div>
                                <div className={cx('ship-info')}>
                                    <FaShippingFast />
                                    <span>Free Shipping</span>
                                </div>
                            </div>
                            <div className={cx('product-quantity')}>
                                <div className={cx('quantity-title')}>
                                    <span>Quantity</span>
                                </div>
                                <div className={cx('quantity')}>
                                    <div className={cx('pro-qty')}>
                                        <span className={cx('qtybtn')} onClick={(e) => handleReduce(e)}>
                                            -
                                        </span>
                                        <input
                                            type="text"
                                            value={productQuantity}
                                            readOnly={true}
                                            onChange={handleQuantity}
                                        />
                                        <span className={cx('qtybtn')} onClick={(e) => handleIncrease(e)}>
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('purchase')}>
                                <div className={cx('add')} onClick={handleAddToCard}>
                                    <BsFillCartPlusFill />
                                    <span>Add To Cart</span>
                                </div>
                                <div className={cx('buy')}>
                                    <Link to={`/checkOut/${productDetail.id}`} state={{detail:productDetail,quantity:productQuantity}}>Buy Now</Link>
                                </div>
                            </div>
                            <div className={cx('faq')}>
                                <div className={cx('return')}>
                                    <TbArrowBackUp />
                                    <span>1h Return</span>
                                </div>
                                <div className={cx('authentic')}>
                                    <AiOutlineFileProtect />
                                    <span>100% Authentic</span>
                                </div>
                                <div className={cx('shipping')}>
                                    <FaShippingFast />
                                    <span>Free Shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail')}>
                        <h4>Product Specifications</h4>
                        <div className={cx('product-details')}>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                    Category
                                </label>
                                <div className="detail-info">{productDetail.type}</div>
                            </div>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                    Name
                                </label>
                                <div className="detail-info">{productDetail.productName}</div>
                            </div>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                    Brand
                                </label>
                                <div className="detail-info">{productDetail.origin}</div>
                            </div>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                    Manufacturer
                                </label>
                                <div className="detail-info">{productDetail.user_manual}</div>
                            </div>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                    Desscription
                                </label>
                                <div className="detail-info">{productDetail.description}</div>
                            </div>
                            <div className={cx('product-detail')}>
                                <label htmlFor="" className={cx('detail-title')}>
                                Ingredient
                                </label>
                                <div className="detail-info">{productDetail.Ingredient}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('describe')}>
                        <h4>Product Description</h4>
                        <span className={cx('des-name')}>{productDetail.name}</span>
                        {productDetail.description &&
                            productDetail.description.split('|').map((d, i) => (
                                <p key={i}>
                                    {'- '}
                                    {d}
                                </p>
                            ))}
                    </div>
                    <div className={cx('appraise')}></div>
                    <div className={cx('more')}>
                        <h4>From The Same Brand</h4>
                    </div>
                  <Comment id={productDetail._id}/>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
