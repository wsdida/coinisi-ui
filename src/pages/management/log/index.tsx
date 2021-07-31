
import {Button, Col, Input, Layout, Modal, Radio, Row, Select, Space, Table} from "antd";
import {DeleteOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons";
import React from "react";

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
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const columns = [
    {
      align:'center',
      title: '日志编号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align:'center',
      title: '系统模块',
      dataIndex: 'age',
      key: 'age',
    },
    {
      align:'center',
      title: '操作类型',
      dataIndex: 'address',
      key: 'address',
    },  {
      align:'center',
      title: '请求方式',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align:'center',
      title: '操作状态',
      dataIndex: 'age',
      key: 'age',
    },
    {
      align:'center',
      title: '操作人员',
      dataIndex: 'address',
      key: 'address',
    }
    ,
    {
      align:'center',
      title: '主机',
      dataIndex: 'address',
      key: 'address',
    }
    ,
    {
      align:'center',
      title: '操作地点',
      dataIndex: 'address',
      key: 'address',
    }
    ,
    {
      align:'center',
      title: '操作日期',
      dataIndex: 'address',
      key: 'address',
    },

    {
      align:'center',
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: () => (
        <Space align={"center"} style={{width:'200px'}}>
          <Button type={"link"} icon={<EyeOutlined />}>详细</Button>
        </Space>
      ),

    },
  ];

  // @ts-ignore
  return(

      <Layout  >
        <Row  gutter={130}>
          <Col><Input type={"primary"} placeholder={"请输入系统模块"} style={{width:'150%'}}/></Col>
          <Col><Input type={"primary"} placeholder={"请输入操作人员"} style={{width:'150%'}}/></Col>
          <Col >
            <Select defaultValue="all" style={{width: '230px'}} onChange={item =>{console.log(item)}} >
             <Option value={"all"}>正常</Option>
            <Option value={"custom"}>禁用</Option>

          </Select></Col>
          <Col ><Button type={"primary"} icon={<SearchOutlined />} style={{marginLeft: '-110px'}}>搜索</Button></Col>
          <Col><Button type={"primary"} icon={<DeleteOutlined />} style={{marginLeft: '-130px'}}>清空</Button></Col>
        </Row>
        <Row >
          <Col>
            <Button type={"primary"}onClick={showModal}>添加</Button>
          </Col>
        </Row>
            <Table
              // @ts-ignore
              bordered={true} rowSelection={{ ...rowSelection, checkStrictly }}
              // @ts-ignore
                   columns={columns} dataSource={data} />
        <Modal
          title="Title"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p><Input placeholder={"请输入字典编号"} /></p>
          <p><Input placeholder={"请输入字典名称"} /></p>
          <p><Input placeholder={"请输入字典类型"} /></p>
          <p> <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">正常</Radio.Button>
            <Radio.Button value="b">禁用</Radio.Button>
          </Radio.Group></p>
          <p><Input.TextArea placeholder={"请输入备注"} /></p>
        </Modal>
      </Layout>

 );
};

export  default Role;
