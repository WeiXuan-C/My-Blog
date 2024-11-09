import { Button, Form, Input, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { request } from '../../../utils/request';

const Publish = () => {
  const [form] = Form.useForm();

  const onFinish = async (formValue) => {
    await request.post('/article',formValue);
    form.resetFields();
  }
  return (
    <Form
      form={form}
      validateTrigger="onBlur"
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
        label="Title"
        name="Title"
        rules={[
          {
            required: true,
            message: 'Please input Title!',
          }
        ]}
      >
        <Input placeholder='Title' style={{ Width: 800 }} />
      </Form.Item>

      <Form.Item
        label="ArticleType"
        name="ArticleType"
        rules={[
          {
            required: true,
            message: 'Please choose Article Type',
          }
        ]}
      >
        <Select style={{ maxWidth: 800 }} options={[
          { value: 'News Articles', label: <span>News Articles</span> },
          { value: 'Feature Articles', label: <span>Feature Articles</span> },
          { value: 'Education and Academic Articles', label: <span>Education and Academic Articles</span> },
          { value: 'Travel and Exploration Articles', label: <span>Travel and Exploration Articles</span> }
        ]} />
      </Form.Item>

      <Form.Item
        label="content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input content!',
          }
        ]}
      >
          <ReactQuill
            className='richEditor'
            theme="snow"
            placeholder='Please input content!'
          />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Publish