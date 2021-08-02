// @ts-ignore
import { request } from 'umi';
/** 查询日志表 GET /api/currentUser */
export async function queryList(params:{'current':string,'size':string,'loginName':string},options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-log/list', {
    method: 'GET',
    requestType: 'form',
    data:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}/** 删除日志信息 GET /api/currentUser */
export async function removes(params:{'ids':string},options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-log/removes', {
    method: 'GET',
    requestType: 'form',
    data:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
