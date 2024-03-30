import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ClassNames from 'classnames';
import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import Crumb from '~/components/Crumb/Crumb';

import img1 from '~/assets/imgs/product-1.jpg';
import { TfiClose } from 'react-icons/tfi';
import { HttpDelete, HttpGet, HttpPost } from '../API/useAuth/auth.api.js';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function Cart({ className }) {
    const [product, setProduct] = useState([]);
    const [total,setTotal] = useState(0)
    const [productQuantity, setProductQuantity] = useState({
        name:"",
        quantity:1
    });
    useEffect(()=>{
        let totalSum = 0;
        if(product){
            product.forEach((item)=>{
                console.log("itemhi",item)
                totalSum += item.productId?.price ? item.productId.price * item.quantity: 0;
            })
            setTotal(totalSum);
        } 
    },[product])
    const handleIncrease = (index) => {
        const check=  product.map((item,i)=>{
           
            if(i==index){
                item.productId.productName = "test"
                item.quantity =item.quantity +1;
            }
           console.log("helo",item.quantity)
           return item
        })
        setProduct(check);
    };

    const handleReduce = (index) => {
        const check=  product.map((item,i)=>{
           
            if(i==index){
                console.log("chec",typeof item.quantity)
                if(item.quantity>1){
                    console.log('check quan',item.quantity)
                    item.quantity =item.quantity -1;
                }else{
                    return item;
                }
            }
           console.log("helo",item.quantity)
           return item
        })
        setProduct(check);
    };
    const callApi = async()=>{
        console.log("call api")
        const rs = await HttpGet(`/cart/get`)
        
        if (rs.status === 200) {
            setProduct(rs.data);

        }
    }
    useEffect(() => {
        callApi();
    }, []);
   
    console.log('rs', product)
    
    const HandleClickDelete = async(idPro)=>{
        console.log("co chay day ko")
        console.log("acc",idPro)
        const rs = await HttpDelete(`/cart/delete?id=${idPro}`)
        if(rs.status==200){
            toast.success("Xoa san pham ra khoi gio hang thanh cong");
            callApi();
        }else{
            toast.error("Xoa san pham ra khoi gio hang thất bại")

        }
    }
    return (
        <div className={cx('wrapper')}>
            <Crumb title="Shopping Cart" />
            <section className={cx('cart')}>
                <div className={cx('container')}>
                    <div className={cx('cart-table')}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>
                                        <TfiClose className={cx('delete')} />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                               {product ? product.map((item,index)=>{
                                console.log("sao may ko vao day",item.quantity)
                                return(<tr  key={index}>
                                    <td className={cx('cart-pic')}>
                                        <img src={item.productId?.images[0].imgUrl} alt="" />
                                    </td>
                                    <td className={cx('cart-title')}>
                                        <h5>{item.productId?.productName}</h5>
                                    </td>
                                    <td className={cx('p-price')}>{item.productId?.price}đ</td>
                                    <td className={cx('qua-col')}>
                                        <div className={cx('quantity')}>
                                            <div className={cx('pro-qty')}>
                                                <span className={cx('qtybtn')} onClick={() => handleReduce(index)}>
                                                    -
                                                </span>
                                                <input
                                                    type="text"
                                                    readOnly={true}
                                                    value={item.quantity}
                                                />
                                                <span className={cx('qtybtn')} onClick={() => handleIncrease(index)}>
                                                    +
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cx('total-price')}>{item.productId?.price ? item.quantity * item.productId?.price:""}đ</td>
                                    <td className={cx('close-td')} >
                                        <TfiClose className={cx('delete')} onClick={()=>HandleClickDelete(item._id)}/>
                                    </td>
                                </tr>)
                               }) :""  }
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('footer')}>
                        <div>
                            <div className={cx('cart-buttons')}>
                                <Link to="/shop" className={cx('continue-shop')}>
                                    Continue shopping
                                </Link>
                                <Link to="#!" className={cx('up-cart')}>
                                    Update cart
                                </Link>
                            </div>
                            <div className={cx('discount-coupon')}>
                                <h6>Discount Codes</h6>
                                <form action="#" className={cx('coupon-form')}>
                                    <input type="text" placeholder="Enter your codes" />
                                    <button type="submit" className={cx('coupon-btn')}>
                                        Apply
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className={cx('proceed-checkout')}>
                            <ul>
                              
                                <li className={cx('cart-total')}>
                                    Total <span>{total} vnd</span>
                                </li>
                            </ul>
                            <Link to="/checkout" className={cx('proceed-btn')} state={{cartProduct:product}}>
                                PROCEED TO CHECK OUT
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;
