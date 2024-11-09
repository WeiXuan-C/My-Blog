import { Button, Form, Select, Space, Table, Input, Modal, Popconfirm } from 'antd';
import ReactQuill from 'react-quill';
import './index.scss'
import { request } from '../../../utils/request';
import { useEffect, useState } from 'react';

const Article = () => {
  const [tableData, setTableData] = useState([])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    request.get('/article').then(res => {
      setTableData(res.data)
    })
  }, [])

  const handleEditModalCancel = () => setOpenEditModal(false);

  const [editForm] = Form.useForm()

  const editArticleHandler = async ({ id }) => {
    const { data } = await request.get(`/article/${id}`)
    editForm.setFieldsValue(data)
    setCurrentId(id)
    setOpenEditModal(true)
  }

  const popOnConfirm = async ({ id }) => {
    await request.delete(`/article/${id}`)
    await request.get('/article').then(res => {
      setTableData(res.data)
    })
  }

  const onEditFinish = async (formValue) => {
    await request.put(`/article/${currentId}`, formValue)
    await request.get('/article').then(res => {
      setTableData(res.data)
    })
    setOpenEditModal(false)
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'ArticleType',
      dataIndex: 'ArticleType',
      key: 'ArticleType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <Button onClick={() => editArticleHandler(data)} size="small" type="primary" >Edit</Button>
          <Popconfirm
            placement="topRight"
            title="Remove article"
            description="r u sure to remove this article?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => popOnConfirm(data)}
          >
            <Button size="small" type="primary" danger>Remove</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const onFinish = (formValue) => {
    request.get(`/article?ArticleType=${formValue.ArticleType}`).then(res => setTableData(res.data))
  }

  return (
    <div>
      <Form
        validateTrigger="onBlur"
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
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
          label="ArticleType"
          name="ArticleType"
          rules={[
            {
              required: true,
              message: 'Please choose Article Type',
            }
          ]}
        >
          <Select style={{ maxWidth: 500 }} options={[
            { value: 'News Articles', label: <span>News Articles</span> },
            { value: 'Feature Articles', label: <span>Feature Articles</span> },
            { value: 'Education and Academic Articles', label: <span>Education and Academic Articles</span> },
            { value: 'Travel and Exploration Articles', label: <span>Travel and Exploration Articles</span> }
          ]} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button className="searchBtn" type="primary" htmlType="submit" >
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table className="articletable" 
      rowKey='id' 
      columns={columns} 
      dataSource={tableData} 
      size='small' 
      style={{ 
        height: 430,
      }} 
      pagination={{ pageSize: 8 }} />

      <Modal
        forceRender
        footer={[]}
        title="Edit Article"
        open={openEditModal}
        onCancel={handleEditModalCancel}
        width={700}
      >
        <Form
          validateTrigger="onBlur"
          name="edit"
          form={editForm}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onEditFinish}
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
            <Input placeholder='Title' />
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
            <Select options={[
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
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Article