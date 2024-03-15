import { useEffect, useState } from "react";
import { message as antdMessage, Space, Table, Tag, Pagination, Select, Input } from 'antd'
import { Button } from '@themesberg/react-bootstrap';

import { faDownload } from "@fortawesome/free-solid-svg-icons";
const {Search } = Input;
function Member() {
    const [page, setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10); 
    const [curentPage, setCurentPage] = useState(1);
    const [totalPage, setotalPage] = useState(1)
    const [members,setMembers] = useState([])
    const [courses, setCourses] = useState([])

    
   
    const handleChange = (page,pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }
   
    const handleImportExcel = () => {

    }
   
    const columns = [
        {
            title: 'ID',
            dataIndex: 'maTV',
            key: 'maTv'
        },
        {
            title: 'Name',
            dataIndex: 'tenTv',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'diaChi',
            key: 'diaChi',
        },
        {
            title: 'Course',
            dataIndex: 'khoahoc',
            key: 'khoahoc',
            render: (_,khoahoc) => {


                let color = null;
                if(khoahoc.khoahoc.trim() == "K15") {
                    color = 'geekblue'
                } else if(khoahoc.khoahoc.trim() == "K16") {
                    color = 'green'
                } else if(khoahoc.khoahoc.trim() == "K17") {
                    color = 'volcano'
                } else {
                    color = 'purple'
                }
                return (
                    <>
                        <Tag color={color} key={khoahoc.khoahoc}>
                            {khoahoc.khoahoc}
                        </Tag>
                    </>
                )
            }
        },
];
    const data = [...members]
    return ( 
        <>
                <span>
                    <p>Import Excel</p>
                    <Button type="primary" icon={faDownload} size={'lg'} onClick={handleImportExcel} />
                </span>
                
                <span>
                    <p>Export</p>
                    {/* <Button type="primary" icon={faDownload} size={'lg'} onClick={handleExport} /> */}
                </span>
                <Search
                      placeholder="Search"
                      allowClear
                    //   onSearch={onSearch}
                      style={{
                        width: 200,
                      }}
                      onPressEnter={(e) => {
                        e.preventDefault();
                        // onSearch(e.target.value)
                      }}
                    />

                    <Search
                      placeholder="Search Id"
                      allowClear
                    //   onSearch={onSearchId}
                      style={{
                        width: 200,
                      }}
                      onPressEnter={(e) => {
                        e.preventDefault();
                        // onSearchId(e.target.value)
                      }}
                    />

                <Select
                    labelInValue
                    defaultValue={courses[0]}
                    style={{
                    width: 150,
                    }}
                    // onChange={handleCourse}
                    options={courses}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    // loading={loading}
                />
                <Pagination current={curentPage} total={totalPage * pageSize} onChange={handleChange} />
        </>
    );
}

export default Member;