import { UploadOutlined, UserOutlined, VideoCameraOutlined ,LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Popconfirm, message } from 'antd';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo,clearUserInfo } from '../../../store/modules/user';
import './index.scss'
import { useEffect, useState } from 'react';
import logo from './assets/aurax-logo.png'
import {Tooltip} from 'antd'

const { Header, Content, Sider } = Layout;


const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userName = useSelector((state) => state.user.userInfo.username)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(()=>{
    //提示用户登入成功
    message.success('Welcome Back')
    dispatch(fetchUserInfo())
  },[dispatch])

  const onSideBarClick = (route) => {
    navigate(route.key)
    }

  const logOutHandler= () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }

  //Last updated..
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
  useEffect( () => {
    const timer = setInterval( () => {
      setCurrentTime(new Date().toLocaleString())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const items = [
    {
      label:'Dashboard',
      key:'/',
      icon:<UserOutlined/>
    },
    {
      label:'Article',
      key:'/article',
      icon:<VideoCameraOutlined/>
    },
    {
      label:'Publish',
      key:'/publish',
      icon:<UploadOutlined/>
    },
    {
      label:'User',
      key:'/user',
      icon:<UserAddOutlined />
    },
  ]

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>

      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed)
        }}
      >
        <div className="demo-logo-vertical">
          <Link to="/">
            <img src={logo} alt="AuraX" style={{
              height: "60px",
              width: "auto",
              }}
            />
            </Link>
            <h4>AuraX</h4>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={location.pathname} onClick={onSideBarClick} items={items} />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <Tooltip title={userName || ''}>
            <UserOutlined className="user" />
          </Tooltip>
          <Popconfirm
          placement="bottomRight"
          title='Confirm to log out?'
          description='This action will jump to the login page'
          okText="Yes"
          cancelText="No"
          icon={<LoginOutlined/>}
          onConfirm={logOutHandler}
        >
          <Button icon={<LoginOutlined/>} type="primary" danger>Log Out</Button>
        </Popconfirm>

        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 20,
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            <span 
              style={{ 
                color: "#ffffff", 
                textAlign: "right",
                display: "flex",
                justifyContent: "flex-end",
                padding: "0px 0px 20px 0px"
              }}
            >
              Last Updated on {currentTime}
            </span>
          <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home