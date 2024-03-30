
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { CounterWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import {Table, message as antdMessage} from 'antd'
import  DataCountManagerMember  from "../data/DataCountManagerMember";
import DataCountManagerPosts from "../data/DataCountManagerPosts";
import { HttpGet } from "~/pages/API/useAuth/auth.api";
const DashboardOverview =  () => {
    const [informative, setInformative] = useState([])
    const [inforPosts, setInforPosts] = useState([])
    const [year, setYearPost] = useState(2023);
    const [dataSource,setDataSource] = useState([]);
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
        const sourData = rs.data.data.map((item,index)=>{
          const {_id,productId,userId,quantity,price} = item;
          const fullName = userId.fullName;
          const productName = productId.productName;
          const phoneNumber = userId.phoneNumber;
          const total = price * quantity
          const dt = new Date(item.uploadAt);
          const day = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + "-" + dt.getHours() + "h" +dt.getMinutes() + "p";
          const isPay = item?.ispay ? 'Rồi' : 'Chưa';
          return {_id,quantity,price,productName,fullName,phoneNumber,total,day,isPay};
        })
        setDataSource(sourData);
        console.log('checjk soure',sourData)
      }
   }
    useEffect(() => {
      callApi()
    }, [])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Product sell"
            title="12"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <Row>
      <Table dataSource={dataSource} columns={columns}  pagination={false} rowKey="_id"/>
      </Row>
 
    </>
  );
};

export default DashboardOverview;
