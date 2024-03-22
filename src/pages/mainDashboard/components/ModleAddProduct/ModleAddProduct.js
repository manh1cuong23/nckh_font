import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import style from './ModleAddProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { HttpPost, HttpPut } from '~/pages/API/useAuth/auth.api';
const cx = classNames.bind(style);

function ModleAddProduct({handleAdd,productAll}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [img,setImg] = useState()
    useEffect(() => {
    }, [])
    console.log('checkoik',img)
    const handleAddProduct = async (product) => {
       console.log('check upda',product)
       if(product){
           const {productName,quanlity,price,description,origin} = product
        const rs = await HttpPost(`/product/create`,{productName,quanlity,description,price,origin})
        if(rs.status == 200){
            toast.success("update product success");
            console.log('check add',rs)
            let hhh = rs.data
            productAll = [hhh,...productAll]
        }else{
            toast.error("update product unsuccess")
        }
        if(img){

            console.log('immmm2',img)
            const fd = new FormData();
            fd.append('img',img,img.name)
            const rs2 = await HttpPost(`/images/upload?name=${product.productName}&productId=${rs.data._id}`,fd)
            if(rs2.status == 200){
                toast.success("update product image success");
                productAll.forEach((item)=>{
                    if(item._id == rs.data._id){
                        item.images[0] = rs2.data.img;
                    }
                })
                console.log(" siuuuuu",rs2)

            }else{
                toast.error("update product image unsuccess")
            }
        }
        handleAdd(productAll);
       }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} autoComplete="off" onSubmit={handleSubmit(handleAddProduct)}>
                <div className={cx('form-group')}>
                    <label htmlFor="productName" className={cx('form-label')}>
                        Name product
                    </label>
                    <input
                        type="text"
                        className={cx('form-control')}
                        id="productName"
                        // value={email}
                        placeholder="Example:Manhcuong"
                        autoComplete="new-price"
                        {...register('productName', {
                            required: true,
                           
                        })}
                    />
                    {errors.productName && errors.productName.type === 'required' && (
                        <span className={cx('error-message')}>productName cannot be empty !</span>
                    )}
                 
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="price" className={cx('form-label')}>
                        price 
                    </label>
                    <input
                        type="price"
                        className={cx('form-control')}
                        id="price"
                        // value={price}
                        placeholder="Enter price"
                        autoComplete="off"
                        {...register('price', {
                          
                        })}
                    />
                    {errors.price && errors.price.type === 'required' && (
                        <span className={cx('error-message')}>price cannot be empty !</span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="quanlity" className={cx('form-label')}>
                        quanlity 
                    </label>
                    <input
                        type="quanlity"
                        className={cx('form-control')}
                        id="quanlity"
                        // value={quanlity}
                        placeholder="Enter quanlity"
                        autoComplete="off"
                        {...register('quanlity', {
                          
                        })}
                    />
                    {errors.quanlity && errors.quanlity.type === 'required' && (
                        <span className={cx('error-message')}>quanlity cannot be empty !</span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="origin" className={cx('form-label')}>
                        origin 
                    </label>
                    <input
                        type="origin"
                        className={cx('form-control')}
                        id="origin"
                        // value={origin}
                        placeholder="Enter origin"
                        autoComplete="off"
                        {...register('origin', {
                          
                        })}
                    />
                    {errors.origin && errors.origin.type === 'required' && (
                        <span className={cx('error-message')}>origin cannot be empty !</span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="origin" className={cx('form-label')}>
                        description 
                    </label>
                    <input
                        type="description"
                        className={cx('form-control')}
                        id="description"
                        // value={description}
                        placeholder="Enter description"
                        autoComplete="off"
                        {...register('description')}
                    />
                    
                </div>
                  <div className={cx('form-group')}>
                    <label htmlFor="origin" className={cx('form-label')}>
                        images 
                    </label>
                    <input
                        type="file"
                        className={cx('form-control-file')}
                        id="images"
                        // value={images}
                        placeholder="Enter images"
                        autoComplete="off"
                        onChange={(e)=>{console.log('ok');setImg(e.target.files[0])}}
                        // {...register('images')}
                    />
                    
                </div>
                <button className={cx('submit')} type="submit">
                    Add
                </button>

              
            </form>
        </div>
    );
}

export default ModleAddProduct;
