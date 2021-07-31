
import {Button, Col, Form, Input, Layout, Modal, Radio, Row, Select, Space, Table, Tag} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";

import {deletePost, queryPost, savePost, updatePost} from "@/services/system/post";
import {PageHeaderWrapper} from "@ant-design/pro-layout";


const { Option } = Select;

const data :any = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}





const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const Role: React.FC = () => {
  const [checkStrictly] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [postData,setPostData] = useState();
  const [searchForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [modalTitle,setModalTitle] = useState("");

  let [param] = useState({'postCode':'','postName':'','status':''});
  const showModal = () => {
    setModalTitle("添加岗位")
    setVisible(true);
  };

  const fetchData = async () => {
    // @ts-ignore
    const result = await queryPost(param);
    // @ts-ignore
    setPostData(result);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOk = () => {
    setConfirmLoading(true);
    if(modalTitle=="添加岗位"){
      savePost(modalForm.getFieldsValue());
    }else{
      updatePost(modalForm.getFieldsValue());
    }

    modalForm.resetFields();
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      param = modalForm.getFieldsValue();
      fetchData();
    }, 200);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const columns = [
    {
      align: 'center',
      title: '岗位名称',
      dataIndex: 'postName',
      key: 'postName',
    },
    {
      align: 'center',
      title: '岗位编码',
      dataIndex: 'postCode',
      key: 'postCode',
    },
    {
      align: 'center',
      title: '岗位顺序',
      dataIndex: 'postSort',
      key: 'postSort',
    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text: any, record: any) =>(
        <Space>
          {
            record.status?<Tag color="success"> 正常</Tag>:<Tag color="default">禁用</Tag>
          }
        </Space>

      )
    },
    {
      align: 'center',
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      align: 'center',
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      align: 'center',
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text: any, record: any) => (
        <Space align={"center"} style={{width:'200px'}}>
          <Button type={"link"} icon={<EyeOutlined />} onClick={ ()=>{
            setModalTitle("编辑岗位");
            setVisible(true);
            modalForm.setFieldsValue(record);
          }}>编辑</Button>

          <Button type={"link"} icon={<EyeOutlined />} onClick={ ()=>{
            deletePost(record);
            setTimeout(function () {
              fetchData();
            }, 200);
          } }>删除</Button>
        </Space>
      ),

    },
  ];

  // @ts-ignore
  return(

      <Layout  >

        <PageHeaderWrapper title={false} />
        <div style={ {marginTop:30,backgroundColor: '#FFF'} }>
        <Form layout="inline" form={searchForm} style={ {marginTop: 40,marginLeft: 40} }>
          <Form.Item label="岗位名称" name="postName">
            <Input type={"primary"} placeholder={"请输入岗位名称"} />
          </Form.Item>
          <Form.Item label="岗位编码" name="postCode" style={ {marginLeft: 20} }>
            <Input type={"primary"} placeholder={"请输入岗位名称"} />
          </Form.Item>

          <Form.Item label="状态" name="status" style={ {marginLeft: 20} }>
            <Select defaultValue="true"  onChange={item =>{console.log(item)}} style={{ width:200 }}>
              <Option value={"true"}>正常</Option>
              <Option value={"false"}>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item style={ {marginLeft: '36%'} }>
            <Button type={"primary"}  onClick={ ()=>{
              console.log(searchForm.getFieldsValue());
              param = searchForm.getFieldsValue();
              fetchData();
            }}  >搜索</Button>

          </Form.Item>
          <Form.Item >
            <Button type={"primary"} ghost onClick={ ()=>{
              searchForm.resetFields();
              setTimeout(function () {
                param = searchForm.getFieldsValue();
                fetchData();
              }, 200);
            } } >重置</Button>
          </Form.Item>
        </Form>

        <Row style={ {marginTop: 30,marginLeft: 40} }>
          <Col>
            <Button type={"primary"} ghost onClick={showModal}>添加</Button>
          </Col>
          <Col style={ {marginLeft: 20} }>
            <Button type={"primary"} ghost onClick={showModal}>删除</Button>
          </Col>
        </Row>

            <Table
              style={ {marginTop: 10,marginLeft: 40,marginRight: 40,marginBottom: 30} }
              pagination={false}
               bordered={true} rowSelection={{ ...rowSelection, checkStrictly }}
              // @ts-ignore
                   columns={columns} dataSource={postData} />
        </div>
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form form={modalForm}>
            <Form.Item hidden={true} name="postId">
              <Input placeholder="请输入岗位名称" />
            </Form.Item>
            <Form.Item label="岗位名称" name="postName">
              <Input placeholder="请输入岗位名称" />
            </Form.Item>
            <Form.Item label="岗位编码" name="postCode">
              <Input placeholder="请输入岗位编码" />
            </Form.Item>
            <Form.Item label="岗位顺序" name="postSort">
              <Input placeholder={"请输入岗位顺序"} />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <Input.TextArea placeholder={"请输入备注"} />
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Radio.Group  buttonStyle="solid">
                <Radio.Button value={true}>正常</Radio.Button>
                <Radio.Button value={false}>禁用</Radio.Button>
              </Radio.Group>
            </Form.Item>

          </Form>
        </Modal>
      </Layout>

 );
};

export  default Role;
