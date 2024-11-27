import { Card, Button, Checkbox, Form, Input, message} from 'antd';
import './index.scss'
import { useDispatch } from 'react-redux';
import { loginHandler } from '../../store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    //触发异步action
    try{
      await dispatch(loginHandler(values))
    //跳转到首页
      navigate('/')
    }catch (error){
      console.error("Login failed", error)
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center">
      <Card
        title="Login Page"
      >
        <Form
          validateTrigger="onBlur"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username.',
              },
              {
                pattern:/.{5,}/,
                message:'Please input more than 4 characters.',
              },
            ]}
          >
            <Input size="large" placeholder='Username'/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            //多条校验逻辑 第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern:/(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}/,
                message:'Please write more than 8 characters and include uppercase letters, lowercase letters and symbols',
              },
            ]}
          >
            <Input.Password size="large" placeholder='Password'/>
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox style={{color:'rgb(219, 219, 215)',}}>Remember me</Checkbox>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login