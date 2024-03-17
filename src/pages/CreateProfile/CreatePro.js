import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import style from './CreatePro.module.scss';
import Crumb from '~/components/Crumb/Crumb';
import img1 from '~/assets/imgs/women-large.jpg';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { HttpGet, HttpPost, HttpPut } from '../API/useAuth/auth.api';
const cx = classNames.bind(style);

function CreatePro() {
    // const location = useLocation();
    // const inputValue = location.state.productQuantity;

    // console.log(location);
    // console.log(inputValue);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [date, setDate] = useState(); 
    const param = useParams();

    const [productCheckOut, setProductCheckOut] = useState([]);
    // const [cartCheckOut, setCartCheckOut] = useState([]);
    const [profile,setProfile] = useState({})

    const callApi = async () => {
        const rs = await HttpGet(`/profile/getProfileClient`);
        if(rs.status == 200){
            setProfile(rs.data);
        }
    };

    useEffect(() => {
        callApi();
    }, []);

     const onSubmitPro = async(data)=>{
        if(!date){
            toast.warning("Please select birthday")
        }
        const newData = {...data,birthday:date}
        const rs = await HttpPut(`/profile/updateProfile`,newData)
        if(rs.status==200){
            toast.success("update profile success")
        }else{
            toast.error("update profile unsuccess")

        }

        console.log("dataa",newData)
        
     }
     const HandleUpdate =()=>{

     }
    return (
        <div className={cx('wrapper')}>
            <Crumb title="Check Out" />
            <div className={cx('container')}>
                <form action="#" className={cx('checkout-form')} onSubmit={handleSubmit(onSubmitPro)}>
                    <div className={cx('row')}>
                        <div className={cx('form-left')}>
                           
                            <h4 className={cx('bill-title')}>Your Profile</h4>
                            <div className={cx('form-group')}>
                                <label htmlFor="fullName" className={cx('form-label')}>
                                    Full Name <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.fullName}
                                    {...register('FullName', {
                                        required: true,
                                    })}
                                />
                                {errors.FullName && errors.FullName.type === 'required' && (
                                    <span className={cx('error-message')}>FullName cannot be empty !</span>
                                )}
                            </div>
                          
                            <div className={cx('form-group')}>
                                <label htmlFor="phone" className={cx('form-label')}>
                                    Phone <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.phoneNumber}
                                    {...register('PhoneNumber', {
                                        required: true,
                                        maxLength: 15,
                                        minLength: 9,
                                        valueAsNumber: false,
                                    })}
                                />
                                {errors.PhoneNumber && errors.PhoneNumber.type === 'required' && (
                                    <span className={cx('error-message')}>Phone number cannot be empty !</span>
                                )}
                                {errors.PhoneNumber && errors.PhoneNumber.type === 'maxLength' && (
                                    <span className={cx('error-message')}>Invalid phone number</span>
                                )}
                                {errors.PhoneNumber && errors.PhoneNumber.type === 'minLength' && (
                                    <span className={cx('error-message')}>Invalid phone number</span>
                                )}
                            </div>
                          
                            <div className={cx('form-group')}>
                                <label htmlFor="address" className={cx('form-label')} >
                                    Address <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    value={profile.address}
                                    {...register('Address', {
                                        required: true,
                                    })}
                                />
                                {errors.Address && errors.Address.type === 'required' && (
                                    <span className={cx('error-message')}>Address cannot be empty !</span>
                                )}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="Note" className={cx('form-label')}>
                                    Birthday
                                </label>
                                <div className={cx('form-date2')}>
                                    <DatePicker className={cx('form-date')}  selected={profile.birthday} onChange={(date) => setDate(date)} style={{height:'300px'}}/>
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="Note" className={cx('form-label')}>
                                    Note
                                </label>
                                <textarea type="text" className={cx('form-note')}
                                value={profile.note}
                                 {...register('Note', {
                                    required: false,
                                })} 
                                />
                            </div>
                            <button type="submit" className={cx('place-btn')} onClick={HandleUpdate}>
                                    Update
                                </button>
                        </div>
                        <div className={cx('form-right')}>
                                <div className={cx('order-btn')}>
                              <img src={img1} alt="women" />

                               
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePro;
