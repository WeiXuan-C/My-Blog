import { UploadOutlined, UserOutlined, VideoCameraOutlined ,LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Popconfirm, message } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo,clearUserInfo } from '../../../store/modules/user';
import './index.scss'
import { useEffect } from 'react';

const { Header, Content, Sider } = Layout;


const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userName = useSelector((state) => state.user.userInfo.username)
  console.log(userName)

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

  const items = [
    {
      label:'Profile',
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
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical"><h4>MyBlog</h4></div>
        <Menu theme="dark" mode="inline" selectedKeys={location.pathname} onClick={onSideBarClick} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <span className='user'>
          <UserOutlined />
          {userName || ''}
          </span>
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
              padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home