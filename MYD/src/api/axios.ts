// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AnyMxRecord } from 'dns';
//import Qs from 'qs'
//import { useRouter } from "vue-router";
//import { ElLoading  } from 'element-plus';
import { ElMessage, ElLoading, ElMessageBox } from "element-plus";
import router from "@r/index.ts";
import { resolve } from 'path/posix';
let Loading: any = null; //定义loading变量
//开始 加载loading
//const router_login = useRouter();
const startLoading = () => {
  Loading = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//结束 取消loading加载
let endLoading = () => {
  Loading.close()
}
const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  // 联调
  baseURL: '/api',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      //     'Content-Type':'multipart/form-data'
      'Content-Type': 'application/json;charset=utf-8'
    },
    upload: {
      'Content-Type': 'multipart/form-data'
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: true,// 允许携带cookie
  timeout: 5 * 60 * 1000,
  transformRequest: [(data) => {
    data = JSON.stringify(data)
    return data
  }],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

// 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
  //console.log(config.data.type );
  startLoading();
  config.headers.token = sessionStorage["TOKEN"];
  //console.log('请求拦截器');
  return config;
}, (error) => {
  // 错误抛到业务代码
  endLoading();
  return Promise.reject(error)
  //return Promise.resolve(error)

})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  const status = response.status;
  //const data = response.data + 'JJ';
  //console.log(typeof response.data);
  console.log(response);
  const res: any = response.data.res;
  //const res: any =  eval('(' +  response.data + ')');
  //console.log(typeof res);
  //var res1=res.parseJSON();
  //console.log(res.res)
  endLoading()
  let msg = ''
  //console.log('响应拦截器');
  //if()
  switch (true) {
    case res >= 200:
      ElMessageBox.alert("结果条数过多，请输入更详细的内容后再进行查询", "失败", {
        confirmButtonText: "确定",
      });
      break
    case res == -1:
      ElMessageBox.alert("查询失败", "失败", {
        confirmButtonText: "确定",
      });
      break
    case res == 'success':
      ElMessageBox.alert("提交成功", "成功", {
        confirmButtonText: "确定",
      });
      break
    case res == 'fail':
      ElMessageBox.alert("提交失败", "失败", {
        confirmButtonText: "确定",
      });
      break
    default:
      console.log('返回'+res+'条');
    /*       ElMessageBox.alert("失败", "失败", {
            confirmButtonText: "确定",
          }); */
  }

  if (status == 401) {
    sessionStorage.clear(); 
    router.replace("/");
    ElMessage.error("未授权,请重新登录后操作");
  }


  else if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码

    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = { msg }
    } else {
      response.data.msg = msg
    }
  }
  // console.log(response)
  return response
  // return JSON.parse('(' + response + ')')
}, (error) => {
  //console.log(error);
  endLoading()
  //error.data = {}
  // error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  //return Promise.resolve(error)
  return Promise.reject(error)
})

export default service