import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Shop.module.scss';
import axios from 'axios';
import Filter from '~/components/Filter/Filter';
import Product from '~/layouts/components/Product/Product';
import Crumb from '~/components/Crumb/Crumb';
import { HttpGet } from '../API/useAuth/auth.api';
import { Pagination } from 'antd';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(style);

function Shop() {
    // Pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPage, setTotalPage] = useState(1);
    const [totalItem, settotalItem] = useState(1);

    const lastIndex = page * pageSize;
    const firstIndex = lastIndex - pageSize;

    // Filter product
    const [categories, setCategories] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [tag, setTag] = useState('');

    const handleFilter = () => {
        // let updateProduct = productTag([]);
        if (categories) {
        }
    };

    // Call API
    const [productTag, setProductTag] = useState([]);
    const callApi = async () => {
        const rs  = await HttpGet(`/product/get?pageSize=${pageSize}&pageIndex=${page}`);
        if (rs.status === 200) {
            setProductTag(rs.data.products);
            setTotalPage(rs.data.totalPage)
            settotalItem(rs.data.totalitem)
        }
    };

    const location = useLocation();
    const data = location.state ? location.state.data : null;
    useEffect(() => {
        console.log('data1',data)
        if(data){
            setProductTag(data.products);
            setTotalPage(data.totalPage)
            settotalItem(data.totalitem)
        }else{
            callApi();
        }
        console.log("cjheck",productTag)
    }, [page, pageSize,data]);
    const handPagination = (current, pageSize) => {
        setPage(current);
        setPageSize(pageSize)
    }
    // Sort Product
    const [sort, setSort] = useState();
    const sortProduct = (Data) => {
        console.log('so',sort)
        if (sort === 'Ascending') {
            return Data.sort((a, b) => {
               if(a.price<b.price)return -1
               if(a.price>b.price)return 1
               if(a.price=b.price)return 0
            });
        }
        if (sort === 'Descending') {
            return Data.sort((a, b) => {
                if(a.price>b.price)return -1
                if(a.price<b.price)return 1
                if(a.price=b.price)return 0
             });
        }

        if (sort === 'None') {
            sortByName(Data);
            return Data;
        }
        return sortByName(Data);
    };

    function sortByName(arr) {
        return arr.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }
    console.log("product",productTag)
    return (
        <div className={cx('wrapper')}>
            <Crumb title="Shop" />
            <div className={cx('content')}>
                {/* <div className={cx('filter')}>
                    <Filter
                        isCategory
                        isPrice
                        isTags
                        setCategories={setCategories}
                        setPrice={setPrice}
                        setTag={setTag}
                    />
                </div> */}
                {productTag && (
                    <div className={cx('right-shop')}>
                        {/* {categories !== '' && price !== '' && color !== '' && size !== '' && tag !== '' && (
                            <div className={cx('list-active')}>
                                {categories !== '' && <p>Category : {categories} /</p>}
                                {price !== '' && <p>Price : {price} /</p>}
                                {tag !== '' && <p>Tag : {tag} /</p>}
                            </div>
                        )} */}
                        <div className={cx('sort')}>
                            <select className={cx('sorting')} onChange={(e) => setSort(e.target.value)}>
                                <option value="None">Default Sorting</option>
                                <option value="Ascending">Sort by Price Ascending</option>
                                <option value="Descending">Sort by Price Descending</option>
                            </select>
                            <div className={cx('product-quantity')}>
                                <p>
                                    Show {(page - 1) * pageSize + 1} -{' '}
                                    {(page - 1) * pageSize + productTag.slice(firstIndex, lastIndex).length} Of{' '}
                                    {productTag.length} Product
                                </p>
                            </div>
                        </div>

                        <div className={cx('product')}>
                            {sortProduct(productTag)
                                .map((d, i) => (
                                    <Product data={d} key={i} />
                                ))}
                        </div>
                    
                        <div className={cx('Pagination')}>
                            <Pagination
                                total={totalItem}
                                defaultCurrent={page}
                                onChange={handPagination}
                                pageSize={pageSize}
                                showQuickJumper
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
