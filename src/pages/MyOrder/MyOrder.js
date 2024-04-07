import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MyOrder.module.scss';
import { HttpGet, HttpPut } from '../API/useAuth/auth.api';
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function MyOrder() {
    const [orderProduct,setOrderProduct] = useState([]);
    const [idConfirm,setIdConfirm] = useState();

    const callApi=async()=>{
        const res = await HttpGet('/order/getOrderByIdCusTomer');
        if(res.status == 200){
            setOrderProduct(res.data.data)
        }
    }
    useEffect(()=>{
        callApi()
    },[])
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async(id) => {
    const rs = await HttpPut(`/order/updateConfirm?id=${idConfirm}`)
    if(rs.status == 200){
        toast.success("Đã xác nhận nhận hàng thành công")
        const newPro = orderProduct.filter((item,index)=>{
            return item._id != idConfirm
        })
        setOrderProduct(newPro);
    }else{
        toast.error("Có lỗi khi xác nhận đơn hàng")
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = (data)=>{
    setIdConfirm(data._id)
    setIsModalOpen(true);
  }
    return (
        <div className={cx("wrap")}>
            <h1 className={cx("Title")}>Danh sách sản phẩm đang giao đến bạn</h1>
            <ul className={cx("List products")}>
            <li className={cx("product_item")}>
                    <p className={cx("img")}>Ảnh</p>
                    <p className={cx("name_product")}>Tên sản phẩm</p>
                    <p className={cx("price_product")}>Giá</p>
                    <p className={cx("quanlity_product")}>Số lượng</p>
                    <p className={cx("quanlity_product")}>Ngày đặt hàng</p>
                    <p className={cx("status_product")}>Trạng thái</p>
                    <p className={cx("status_product")}></p>
                </li>
                {orderProduct.length >0 ? orderProduct.map((item,index)=>{
                    return <li key={index} className={cx("product_item")}>
                        <img className={cx("img")} src={item.imgUrl}/>
                        <p className={cx("name_product")}>{item.productId.productName}</p>
                        <p className={cx("price_product")}>{item.productId.price}</p>
                        <p className={cx("quanlity_product")}>{item.quantity}</p>
                        <p className={cx("quanlity_product")}>{item.createdAt.split('T')[0]}</p>
                         <p className={cx("status_product")}>Đang giao</p>
                         <p className={cx("status_product")}>
                            <Button onClick={()=>handleConfirm(item)} variant="outlined" size="small">Đã nhận hàng</Button>
                         </p>


                </li>
                }) : "Không có đơn hàng nào "} 
                
            </ul>
            <Modal title="Thông báo xác nhận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn đã nhận được đơn hàng vui lòng ấn ok để xác nhận.</p>
            </Modal>
        </div>
    );
}

export default MyOrder;
