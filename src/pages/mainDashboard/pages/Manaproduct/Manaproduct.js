import React, { useState } from 'react';

import { Space, Table, Tag } from 'antd';

import { Breadcrumb } from 'antd';
import { HttpDelete, HttpGet } from '~/pages/API/useAuth/auth.api';
import { useEffect } from 'react';
import { Pagination } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
 import ModleEditProduct from '~/pages/mainDashboard/components/ModleEditProduct/ModleEditProduct.js'
 import ModleAddProduct from '~/pages/mainDashboard/components/ModleAddProduct/ModleAddProduct.js'
import { Button, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import style from './manaproduct.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import classNames from 'classnames/bind';
import axios from 'axios';
const cx = classNames.bind(style);
function Manaproduct() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [totalItem, settotalItem] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [deletePro,setDeletePro] = useState(false)
    const [productSelect,setProductSelect] = useState()
    const [productDelete,setProductDelete] = useState()
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOkDelete = () => {
      HandleDelete(productDelete)
      setIsModalOpen(false);

    };
  
    const handleCancelDelete = () => {
      setIsModalOpen(false);
    };
    const handleOkEdit = () => {
      setIsModalOpenEdit(false);
    };
  
    const handleCancelEdit = () => {
      setIsModalOpenEdit(false);
    };
    const handleOkAdd = () => {
      setIsModalOpenAdd(false);
    };
  
    const handleCancelAdd = () => {
      setIsModalOpenAdd(false);
    };
    const [product, setProducts] = useState([])
    const callApi = async () => {
        const rs  = await HttpGet(`/product/productAdmin?pageSize=${pageSize}&pageIndex=${page}`);
        if (rs.status === 200) {
            setProducts(rs.data.products);
            setTotalPage(rs.data.totalPage)
            settotalItem(rs.data.totalitem)
        }
    }


    const handPagination = (current, pageSize) => {
      setPage(current);
      setPageSize(pageSize)
    }

    useEffect(() => {
        callApi()
    }, [page,pageSize]);
    const handleClickDelet = (data)=>{
      setIsModalOpen(true);
      setProductDelete(data);
    }
    const HandleDelete =async (data)=>{
      console.log('dleleel')
        if(!data){
          toast.error("no product item");
          return;
        }else{
          const rs = await HttpDelete(`/product/delete?id=${data._id}`)
          if(rs.status = 200){
            toast.success("delete product success");
            const newPro = product.filter((item)=>{
              return item._id != data._id;
            })
            setProducts(newPro);
          }
        }
     
    

    }

    const HandleEdit = (data)=>{
      console.log('day11',data)
      
      setProductSelect(data)
      setIsModalOpenEdit(true)
    
    }
    const handleEdit = (data)=>{
      console.log('dayttyt',data)
      setProducts(data);
    }
    const handleAddProduct = (data)=>{
      console.log('vaoooo')
      setIsModalOpenAdd(true)

    }
    const handleAdd = (data)=>{
      console.log('adđ dataaa',data)
      setProducts(data);
    }
    const handleExportProduct = async()=>{
      axios({
        url: 'http://localhost:8081/api/v1/product/export-excel',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        responseType: 'blob', // Định dạng phản hồi là blob
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Products.xlsx'; // Tên file khi tải về
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(error => {
        console.error('Axios error:', error);
      });

    }
    const columns = [
      {
        title: 'ProductName',
        dataIndex: 'productName',
        key: 'productName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Quanlity',
        dataIndex: 'quanlity',
        key: 'quanlity',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Origin',
        dataIndex: 'origin',
        key: 'origin',
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
      },{
        title: 'imgae',
        dataIndex: 'imgae',
        key: 'imgae',
        render: (_, record) => (
          <img className={cx('img')}  src={record.images[0]?.imgUrl}/>
        ),
      },
    
    
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a  onClick={()=>HandleEdit(record)}>
            <EditIcon/>
            </a>
            <a  onClick={()=>handleClickDelet(record)}>
            <DeleteIcon />
            </a>
          </Space>
        ),
      },
    ];
    
    

    return (
        <div>
            <Breadcrumb
                    items={[
                    {
                        title: <a href='/Home'>Home</a>,
                    },
                    {
                        title: <a href="/product">Products</a>,
                    },
                    ]}
                />
                <div className={cx("wrap_button")}>
                  <div onClick={handleAddProduct}  className={cx('addWrap')} >
                    <AddCircleIcon   className={cx('addPro')}/>
                      <h4>Thêm sản phẩm mới</h4>
                  </div>
                  <div onClick={handleExportProduct}  className={cx('k')} >
                    <SystemUpdateAltIcon   className={cx('addPro')}/>
                      <h4>Xuất tệp excel</h4>
                  </div>
                </div>
            <Table columns={columns} dataSource={product} pagination={false} rowKey="_id"/>
            <Pagination  total={totalItem}
                          defaultCurrent={page}
                          onChange={handPagination}
                          pageSize={pageSize}
                          showQuickJumper
                          style={{
                          marginTop: '10px',
                          textAlign: 'center'
              }}
            />
            <Modal title="Are you sure to delete this product" open={isModalOpen} onOk={handleOkDelete} onCancel={handleCancelDelete}>
        
      </Modal>
      <Modal width={700} title="Update product" open={isModalOpenEdit} onOk={handleOkEdit} onCancel={handleCancelEdit}>
         <ModleEditProduct data={productSelect} productAll={product} handleEdit={handleEdit}/>
      </Modal>
      <Modal width={700} title="Add product" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
         <ModleAddProduct   productAll={product} handleAdd={handleAdd}/>
      </Modal>
        </div>
        
    )  
}
export default Manaproduct;