import {
    postRequest,
} from './api'
// postRequest是通用接口
// 再进行一层封装对应于不同的业务请求，从而可以重新为请求命名
export const request = {
    saveTest: params => postRequest('/api/test/', params),
}