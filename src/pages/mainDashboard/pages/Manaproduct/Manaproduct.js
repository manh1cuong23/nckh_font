import React, { useState } from 'react';

import { Space, Table, Tag } from 'antd';

import { Breadcrumb } from 'antd';
import { HttpGet } from '~/pages/API/useAuth/auth.api';
import { useEffect } from 'react';
import { Pagination } from 'antd';

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
    title: 'User_manual',
    dataIndex: 'user_manual',
    key: 'user_manual',
  },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];




function Manaproduct() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [totalItem, settotalItem] = useState(1);

    const [product, setProducts] = useState([])
    const callApi = async () => {
        const rs  = await HttpGet(`/product/get?pageSize=${pageSize}&pageIndex=${page}`);
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
            <Table columns={columns} dataSource={product} pagination={false}/>
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
        </div>
    )  
}
export default Manaproduct;