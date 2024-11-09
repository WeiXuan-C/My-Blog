import { Divider, Button, Form, Input, Card, Avatar, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { request } from '../../../utils/request';
import './index.scss'
import { useId} from 'react';

const User = () => {
  const [form] = Form.useForm();
  const id = useId()
  const onFinish = async ({username, password}) => {
    await request.post('/user',{
        "id": id,
        "username": username,
        "password": password,
        "token": id,
        "role": "admin",
        "avatar": "sabo"
    })
    form.resetFields();
  };

  
  const data = [
    {
      title:'simpo'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
    {
      title:'david'
    },
  ];
  
  
  return (
    <div className='addAdminMain'>
      <section className="leftSection">
        <Card
          hoverable
          style={{
            maxWidth: 580,
            maxHeight: 230,
          }}
        >
          <span className='addAdminTitle'>ADD New Admin</span>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 26,
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
                  message: 'Please input new username!',
                },
                {
                  pattern: /.{5,}/,
                  message: 'Please input more than 4 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input new user password!',
                },
                {
                  pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}/,
                  message: 'Please write more than 8 characters and include uppercase letters, lowercase letters and symbols',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 26,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add New User
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card
          hoverable
          style={{
            maxWidth: 580,
            maxHeight: 230,
            marginTop: 40,
          }}
        >
          adada
        </Card>
      </section>

      <section>
        <Card
          hoverable
          style={{
            maxWidth: 600,
            maxHeight: 600,
          }}
        >
          <div
            id="scrollableDiv"
            style={{
              height: 450,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <InfiniteScroll
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
              dataLength={data.length}
            >
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                      title={<span>{item.title}</span>}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default User