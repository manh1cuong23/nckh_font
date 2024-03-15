import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import './Profile.css'
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Profile3 from '../../assets/img/team/profile-picture-1.jpg'
const Profile = () => {
    return (
        <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} className="mb-4">
                <div className='profile_card'>
                    <Avatar size={64} src={Profile3} />
                    <span className='profile_information'>
                      <h1>thang</h1>
                      <p>std</p>
                      <p>email</p>
                      <p>khoa</p>
                      <p>Diachi</p>
                      <p>Courses</p>
                    </span>
                </div>
            </Col>
        </Row>
        </Col>
      </Row>
    )
}
export default Profile