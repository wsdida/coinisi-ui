import styles from './index.less';
import React, {useEffect, useState} from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Modal, Radio,
  Row,
  Space,
  Table, Tag,
  Tree,
  TreeSelect
} from "antd";
import {DeleteOutlined, DownOutlined, PlusOutlined, ReloadOutlined,   UserAddOutlined} from "@ant-design/icons";
import { selectTreeDept} from "@/services/system/dept";
import {addUser, deleteUser, queryUser, updateUser} from "@/services/system/user";
import {selectRole} from "@/services/system/role";
import {updateUserRole} from "@/services/system/userRole";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
// @ts-ignore
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const User: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [treeData,setTreeData] =  React.useState();
  const [params] = React.useState({'deptId':"", 'username': "", 'mobile': '','status': ""});
  const [modalForm] = Form.useForm();
  const [userData,setUserData] = React.useState();
  const [roleData,setRoleData] = React.useState();
  const [selectRoleDatas,setSelectRoleDatas] = React.useState();
  const [searchForm] = Form.useForm();
  const [radioState,setRadioState] = useState(false);
  const [sexState,setSexState] = useState(false);
  const selectRoleData = async  () =>{

    const  result = await  selectRole(params);
    // @ts-ignore
    setRoleData(result);
  }


  const selectRoleDatad = async  () =>{
    const  result = await  selectRole(params);
    let a = JSON.parse(JSON.stringify(result));
    let d = [];
    for(var i = 0; i < a.length; i++){
      d.push(a[i].value);
    }

    // @ts-ignore
    setSelectRoleDatas(d);
  }
  // @ts-ignore
  const columns = [
    {
      hidden: true,
      align: 'center',
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align: 'center',
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      align: 'center',
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      align: 'center',
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      align: 'center',
      title: '部门',
      dataIndex: 'deptId',
      key: 'deptId',
    },
    {
      align: 'center',
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      align: 'center',
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: '头像',
      dataIndex: 'avatar',
      ket: 'avatar',
      render:(record:any)=>(<img src={record} style={{width:20,height:20}}/>)
    },
    {
      align: 'center',
      title: '角色',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
    },
    {
      align: 'center',
      title: '操作',
      key: 'ca',
      dataIndex: 'ca',
      render: (record:any) => (
        <Space size="middle">
          <Button type={"link"} onClick={
            ()=>{
              setSexState(record.gender);
              setRadioState(record.status);
              modalForm.resetFields();
              modalForm.setFieldsValue( record);
              setVisible(true)
              setModalTitle("编辑用户");

            }
          }>编辑</Button>
          <Button type={"link"} onClick={()=>{
            params.deptId = record.id
            // @ts-ignore
            selectRoleDatad();
            setVisibleModal(true);
          }}>角色配置</Button>
          <Button type={"link"} onClick={()=>{
            deleteUser(record.id)
            queryUserData();
          }
          }>删除</Button>
        </Space>
      ),
    }
  ];
  const selectDeptData = async () => {
    const result = await selectTreeDept();
    let r = JSON.parse(JSON.stringify(result).replace(/value/g,"key"));
    setTreeData(r);
  };
  const queryUserData = async  () =>{
    const  result = await  queryUser(params);
    // @ts-ignore
    setUserData(result);
  }

  useEffect(() => {
    queryUserData();
    selectDeptData();
    selectRoleData();
  }, [])
  // @ts-ignore

  return(
    <Layout>
      <PageHeaderWrapper title={false} />

      <Row gutter={[30,20]}  align={'top'} className={styles.body} style={{ marginTop:30,marginRight:4 }} >
        <Col  span={4}  style={ {marginTop: -0 } }>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            onSelect={function (selectedKeys) {
              // @ts-ignore
              params.deptId = selectedKeys;
              queryUserData();
            }}
          />
        </Col>
        <Col span={20} className={styles.col} >
          <Row style={ {marginLeft: 15} }>
            <Col>
              <Space style={{ marginLeft: 12 ,marginTop: 20}} size={20}>
                <Form form={searchForm} layout="inline">
                  <Form.Item label="用户名:" name="username">
                  <Input style={{marginLeft:'10px'}} id={"userId"}  placeholder={"请输入用户名"}/>
                  </Form.Item>
                <Form.Item label="手机号码:" name="mobile" style={ {marginLeft:20} }>
                  <Input style={{marginLeft:'6px'}} id={"userId"}  placeholder={"请输入手机号码"}/>
                </Form.Item>
                  <Form.Item label="状态:" name="status" style={ {marginLeft:20} }>
                  <Input style={{marginLeft:'1px'}} id={"userId"}  placeholder={"请输入状态"}/>
                  </Form.Item>
                  <Form.Item >
                  <Button  type="primary" onClick={()=>{
                    // @ts-ignore
                    let searchData = searchForm.getFieldValue();
                    // @ts-ignore
                    if(searchData != null) {
                      if (searchData.username!=null) {
                        params.username = searchData.username6
                      } else {
                        params.username = ''
                      }
                      if (searchData.mobile!=null) {
                        params.mobile = searchData.mobile;
                      } else {
                        params.mobile = ''
                      }
                      if (searchData.status!=null) {
                        params.status = searchData.status;
                      } else {
                        params.status = ''
                      }
                    }
                    queryUserData();

                  }} >查询</Button>
                  </Form.Item>
                  <Form.Item>
                  <Button   type="default" onClick={()=>{
                    searchForm.resetFields();
                    params.status = '';
                    params.deptId = '';
                    params.mobile = '';
                    params.username = '';
                    queryUserData();
                  }}>重置</Button>
                  </Form.Item>
                </Form>

              </Space>
            </Col>

          </Row>
          <Row>
            <Col>

              <Space style={{ marginTop: 20, marginLeft: 24,}}>
                <Button type={"primary"}
                        ghost
                        color=''
                         icon={<PlusOutlined />}
                        onClick={() =>{

                  modalForm.resetFields();
                  setModalTitle("添加用户");
                  setVisible(true)}}>添加</Button>
                <Button
                  type={"primary"}
                        ghost
                        icon={<DeleteOutlined />}>删除</Button>
                <Button
                        color=''
                        icon={<UserAddOutlined />}>角色重置</Button>
                <Button type={"ghost"}
                        color=''
                        icon={<ReloadOutlined />}
                     >密码重置</Button>

              </Space>
            </Col>
          </Row>

          <Table
            pagination={false}
            style={ {marginLeft:25,marginRight:25,marginTop:8} }
            bordered={true} rowSelection={{
              ...rowSelection }}
            // @ts-ignore
                 columns={columns} dataSource={userData} />
        </Col>5
      </Row>
      <Modal
        title="修改角色"
        centered
        visible={visibleModal}
        onOk={() =>{
          // @ts-ignore
          setVisibleModal(false)
          params.status = '';
          params.deptId = '';
          params.mobile = '';
          params.username = '';
          queryUserData();

        }}
        onCancel={() => setVisibleModal(false)}>

        <TreeSelect
          className={styles.input}
          value={selectRoleDatas}
          treeData={roleData}
          placeholder="请选角色"
          allowClear
          maxTagCount={3}
          multiple
          treeDefaultExpandAll
          onChange={item => {
            // @ts-ignore
            setSelectRoleDatas(item);
            params.status = item.toString();
            updateUserRole(params)
          }}
        />
      </Modal>

      <Modal
        title={modalTitle}
        centered
        visible={visible}
        onOk={() =>{
          if(modalTitle=="添加用户"){
            // @ts-ignore
            addUser(modalForm.getFieldValue());
          }else{
            // @ts-ignore
            updateUser(modalForm.getFieldValue())
          }

          setVisible(false)

        }}
        onCancel={() => setVisible(false)}

      >
        <Form form={modalForm} >
            <Form.Item label="用户名:" name="username">
              <Input />
            </Form.Item>
          <Form.Item label="昵称:" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label="性别:" name="gender">
            <Radio.Group defaultValue={sexState}>
              <Radio value={true}>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="密码:" name="password">
            <Input.Password placeholder="input password"/>
          </Form.Item>
          <Form.Item label="部门:" name="deptId">
            <Input />
          </Form.Item>
          <Form.Item label="手机号:" name="mobile">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱:" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="头像:" name="avatar">
            <img src={modalForm.getFieldValue("avatar")} style={{width:50,height:50}}/>
          </Form.Item>
          <Form.Item label="状态:" name="status">
            <Radio.Group defaultValue={radioState}>
              <Radio value={true}>正常</Radio>
              <Radio value={false}>禁止</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

    </Layout>
 );
};

export  default User;
