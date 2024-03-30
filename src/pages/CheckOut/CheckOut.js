import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import style from './CheckOut.module.scss';
import Crumb from '~/components/Crumb/Crumb';
import { HttpGet, HttpPost } from '../API/useAuth/auth.api.js';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function CheckOut() {
    // const location = useLocation();
    // const inputValue = location.state.productQuantity;


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const param = useParams();
  
    const [productCheckOut, setProductCheckOut] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [profile,setProfile] = useState({})
    const [total,setTotal] = useState(0)
    // const [cartCheckOut, setCartCheckOut] = useState([]);
   
    const callApi = async () => {
        const rs = await HttpGet(`/profile/getProfileClient`);
        if(rs.status == 200){
            setProfile(rs.data);
        }
        
    };

    let { state } = useLocation();
 
    useEffect(() => {
        if(state?.cartProduct){
            setProductCheckOut(state.cartProduct);
        }
        if(state?.detail){
            setProductDetail([state.detail])
        }
        callApi();
    }, []);
    useEffect(()=>{
        let totalSum = 0;
        if(productCheckOut){
            productCheckOut.forEach((item)=>{
                console.log("itemhi",item)
                totalSum +=item.productId?.price * item?.quantity;
            })
            if(!totalSum){
                totalSum = 0;
            }
            setTotal(totalSum);
        } else if(productDetail){
            productDetail?.forEach((item)=>{
                console.log("itemhi",item)
                totalSum +=item.price * item.quanlity;
            })
            if(!totalSum){
                totalSum = 0;
            }
            setTotal(totalSum);
        }
    },[productCheckOut,productDetail])
    const handleProcess = async()=>{
        if(productCheckOut){
            let data = productCheckOut?.map((item)=>{
                return {userId:item.userId,productId:item.productId._id,quantity:item.quantity,price:item.productId.price,idAdmin:item.productId.userId}
            })
            const rs = await HttpPost(`/order/createOrder`,data);
            if(rs.status == 200){
                toast.success("Đơn hàng của bạn đã được phê duyệt");
            }else{
                toast.error("Something wrong");
            }
        }else if(productDetail){
            let data = [{userId:profile?._id,productId:productDetail[0]._id,quantity:productDetail[0].quanlity,price:productDetail[0].price,idAdmin:productDetail[0].userId}]
            console.log('datacv',data)
            const rs = await HttpPost(`/order/createOrder`,data);
            if(rs.status == 200){
                toast.success("Đơn hàng của bạn đã được phê duyệt");
            }else{
                toast.error("Something wrong");
            }
        }

    }
    console.log('check e',productDetail)
    console.log('check b',productCheckOut)
    console.log('check p',profile)
    return (
        <div className={cx('wrapper')}>
            <Crumb title="Check Out" />
            <div className={cx('container')}>
                <form action="#" className={cx('checkout-form')} onSubmit={handleSubmit()}>
                    <div className={cx('row')}>
                        <div className={cx('form-left')}>
                            <div className={cx('checkout-content')}>
                                <Link to='/createPro' state={profile} className={cx('content-btn')}>
                                    Click Here To update profile
                                </Link>
                            </div>
                            <h4 className={cx('bill-title')}>Billing CheckOuts</h4>
                            <div className={cx('form-group')}>
                                <label htmlFor="fullName" className={cx('form-label')}>
                                    Full Name <span>*</span>
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.fullName}
                                  
                                />
                              
                            </div>
                          
                            <div className={cx('form-group')}>
                                <label htmlFor="phone" className={cx('form-label')}>
                                    Phone <span>*</span>
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.phoneNumber}
                                  
                                />
                                
                            </div>
                          
                            <div className={cx('form-group')}>
                                <label htmlFor="address" className={cx('form-label')}>
                                    Address <span>*</span>
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.address}
                                   
                                />
                               
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="address" className={cx('form-label')}>
                                    Note
                                </label>
                                <textarea type="text" disabled className={cx('form-note')} value={profile.note}/>
                            </div>
                        </div>
                        <div className={cx('form-right')}>
                            <div className={cx('checkout-content')}>
                                <input className={cx('content-btn')} placeholder="Enter Your Coupon Code" />
                          </div>
                            <h4 className={cx('bill-title')}>Your Order</h4>
                            <div className={cx('order-total')}>
                                <ul className={cx('order-table')}>
                                <table className={cx('order-table1')}>
                                    <tr >
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    {productCheckOut ? productCheckOut?.map((item,index)=>{
                                        console.log('checkpro',item);
                                        return(
                                            <tr key={index}>
                                                <td>{item.productId?.productName}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.productId?.price}</td>
                                                <td>{ item.productId?.price ? item.productId?.price * item?.quantity: 0}</td>`
                                        </tr>
                                        )
                                    }): productDetail?.map((item,index)=>{
                                       return  <tr >
                                            <td>{item.productName}</td>
                                            <td>{item?.quanlity}</td>
                                            <td>{item?.price}</td>
                                            <td>{ item?.price ? item?.quanlity *  item?.price: 0}</td>`
                                        </tr>
                                    })
                                   }
                                    </table>
                                      
                                </ul>
                                    <li className={cx('payment-total')} >TOTAL<span>{total} VND</span></li>


                                <div className={cx('order-btn')}>
                                    <button  onClick={handleProcess} className={cx('place-btn')}>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CheckOut;
