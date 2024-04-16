
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { CounterWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import {Table, message as antdMessage} from 'antd'
import  DataCountManagerMember  from "../data/DataCountManagerMember";
import DataCountManagerPosts from "../data/DataCountManagerPosts";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HttpGet } from "~/pages/API/useAuth/auth.api";
import axios from "axios";
import style from './DashboardOverview.module.scss';
import classNames from "classnames/bind";
import moment from "moment";

const cx = classNames.bind(style);

const DashboardOverview =  () => {
    const [informative, setInformative] = useState([])
    const [inforPosts, setInforPosts] = useState([])
    const [year, setYearPost] = useState(2023);
    const [dataSource,setDataSource] = useState([]);
    const [startDateFrom, setStartDateFrom] = useState(new Date());
    const [startDateTo, setStartDateTo] = useState(new Date());
    const [totalSale,setTotalSale] = useState(0);
    const [totalSaleRecevie,setTotalSaleRecevie] = useState(0);
    const [productCount,setProductCount] = useState(0);
   
    const columns = [
      {
        title: 'ProductName',
        dataIndex: 'productName',
        key: 'productName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'User',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      
      {
        title: 'PhoneNumber',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },{
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        
      },{
        title: 'Ngày mua',
        dataIndex: 'day',
        key: 'day',
        
      },
      {
        title: 'Thanh toán',
        dataIndex: 'isPay',
        key: 'isPay',
        
      }
    
    ];
   const callApi = async()=>{
      const rs = await HttpGet('/order/getOrderById');
      console.log('check rs',rs)
      if(rs.status == 200){
        let sum = 0 ;
        let receive = 0;
        let count = 0;
        const sourData = rs.data.data.map((item,index)=>{
          const {_id,productId,userId,quantity,price} = item;
          const fullName = userId.fullName;
          const productName = productId.productName;
          const phoneNumber = userId.phoneNumber;
          const total = price * quantity
          const dt = new Date(item.uploadAt);
          const day = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + "-" + dt.getHours() + "h" +dt.getMinutes() + "p";
          const isPay = item?.isPay ? 'Rồi' : 'Chưa';
          sum+=total;
          count+=quantity;
          if(item?.isPay){
            receive+=total;
          }
          return {_id,quantity,price,productName,fullName,phoneNumber,total,day,isPay};
        })
        setDataSource(sourData);
        setTotalSale(sum);
        setTotalSaleRecevie(receive)
        setProductCount(count)
      }
    }
    const callApiGetListOrderByDate = async()=>{
      const rs = await HttpGet(`order/getOrderBydate`)
    }
    console.log('checjk soure',dataSource)
    useEffect(() => {
      callApi()
    }, [])
    const handleExportProduct = ()=>{
      axios({
        url: 'http://localhost:8081/api/v1/order/export_excel',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        responseType: 'blob', // Định dạng phản hồi là blob
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Orders.xlsx'; // Tên file khi tải về
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(error => {
        console.error('Axios error:', error);
      });
    }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      
      </div>

      <Row className="justify-content-md-center">
        <div className={cx('dateWrap')}>
            <span>From:</span>
          <div className={cx('dateFrom')}>
            <DatePicker selected={startDateFrom} onChange={(date) => setStartDateFrom(date)} />
          </div>
            <span>To:</span>
          <div className={cx('dateTo')}>
            <DatePicker selected={startDateTo} onChange={(date) => setStartDateTo(date)} />
          </div>
          <button className={cx('check')}>Check</button>
        </div>
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value={totalSale.toLocaleString('vi-VN')}
            percentage={totalSaleRecevie.toLocaleString('vi-VN')}
          />

        </Col>
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period={`${moment(startDateFrom).format('MMMM Do YYYY')} - ${moment(startDateTo).format('MMMM Do YYYY')}`}
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col> */}
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Product sell"
            title={productCount}
            period={`${moment(startDateFrom).format('MMMM Do YYYY')} - ${moment(startDateTo).format('MMMM Do YYYY')}`}
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <Row>
      <Table dataSource={dataSource} columns={columns}  pagination={false} rowKey="_id"/>
      <div onClick={handleExportProduct}  style={{display:"flex",alignItems:"center", width:"200px",cursor:"pointer", border: "1px solid #ccc",padding:"8px 12px"}}>
                    <SystemUpdateAltIcon   />
                      <h4 style={{marginLeft:"6px"}}>Export excel file</h4>
                  </div>
      </Row>
 
    </>
  );
};

export default DashboardOverview;
