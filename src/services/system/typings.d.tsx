declare namespace SYSTEM {
  type SelectTree = {
    value?: string;
    key?: string;
    title?: string;
    parentId?: number;
    children?: {
      value?: string;
      key?: string;
      title?: string;
      parentId?: number;
    }[];
    deptStateVos?: {
      disabled?: string;
      disableCheckbox?: string;
      pselectable?: string;
      checkable?: string;
    }[];
  }
  type Role = {
    id?: undefined;
    name?: undefined;
    sort?: undefined;
    status?: undefined;
    deleted?: undefined;
    gmtCreate?: undefined;
    gmtModified?: undefined;
    identification?: undefined;
    menuIds?: [];
  }
  type Dept = {
    id?: string;
    name?: string;
    parentId?: string;
    treePath?: string;
    sort?: string;
    value?: string;
    leader?: string;
    mobile?: string;
    email?: string;
    status?: string;
    deleted?: string;
    gmtCreate?: string;
    gmtModified?: string;
    children?: Dept[];
  }
  type User ={
    id?: string;
    deptId?:string;
    deleted?:string;
    username?:string;
    nickname?:string;
    gender?:string;
    password?:string;
    avatar?:string;
    mobile?:string;
    status?:string;
    email?:string;
    gmtCreate?:string;
    gmtModified?:string;
  }

  type Dict = {
    id?:string;
    name?:string;
    code?:string;
    status?:boolean;
    remark?:string;
    gmtCreate?:string;
    gmtModified?:string;
  }
  type DictItem = {
    dictCode?:string;
    status?:string;
    id?:string;
    name?:string;
    remark?:string;
    gmtCreate?:string;
    gmtModified?:string;
    defaulted?:string;
    sort?:string;
    value?:string;
  }
type Post ={
    postId?:string;
    postCode?:string;
    postName?:string;
    postSort?:string;
    status?:string;
    createBy?:string;
    createTime?:string;
    updateBy?:string;
    updateTime?:string;
    remark?:string;
}
}
