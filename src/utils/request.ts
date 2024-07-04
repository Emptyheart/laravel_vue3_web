import axios, {AxiosError, AxiosRequestConfig} from "axios"
import qs from "qs"
import router from "../router";
import {ElMessage} from "element-plus";
// @ts-ignore
import {useUserStore} from '../stores/user.js'
// @ts-ignore
import {groom} from "@/utils/format";
import {isObject, isString, isEmpty} from "lodash";

axios.defaults.timeout = 30000;

// @ts-ignore

const baseURL = import.meta.env.VITE_BASE_URL as string;
const userStore = useUserStore()

axios.defaults.baseURL = baseURL.replace(/^https?:/, location.protocol)
axios.defaults.withCredentials = true;
const token = userStore.access_token?._value
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

axios.interceptors.response.use(response => response?.data, async (error: AxiosError) => {
  ElMessage.error(error.response?.data || error.message)
  // 401错误
  if (error.response?.status === 401) {
    useUserStore().clearUserToken()
    await router.push('/login')
  }
  throw error
})

// 去除null/""请求去除


// https://github.com/ljharb/qs/issues/372
export const $post = (url: string, data?: any): any => axios.post(url, qs.stringify(data, { indices: false }))
export const $postJson = (url: string, data?: any): any => axios.post(url, groom(data))

export const $put = (url: string, data?: any): any => axios.put(url, qs.stringify(data))
export const $putJson = (url: string, data?: any): any => axios.put(url, groom(data))

export const $patch = (url: string, data?: any): any => axios.patch(url, qs.stringify(data))
export const $patchJson = (url: string, data?: any): any => axios.patch(url, groom(data))

// 移除掉前后空格
const removeLeadingAndTrailingWhitespace = (params: any) => {
  if (!isObject(params)) return params

  // 移除数据
  const req = Object.create(null)
  for (const [key, value] of Object.entries(params)) {
    if (isString(value)) { // 字符串处理
      if (!!value.trim()) { // 空置直接跳过
        req[key] = value.trim();
      }
    } else { // 非字符串处理 TODO:零值问题此处需要特殊处理
      if(!!value) { // 空值跳过
        req[key] = value;
      }
    }
  }
  return req
};

// 请求参数中的arr的重复模式
const paramsSerializerArrayFormatRepeat = (params) => {
  return qs.stringify(params, {arrayFormat: 'repeat'})
}

export const $get = (url: string, params?: any): any => {
  // 移除前后查询字符串空格
  const req = removeLeadingAndTrailingWhitespace(params)
  return axios.get(url, {
    params: req,
    // 序列化问题
    paramsSerializer: paramsSerializerArrayFormatRepeat
  })
}

export const $del = (url: string, params?: any): any => axios.delete(url, {
  params
})
export const $delJson = (url: string, data?: any): any => axios.delete(url, groom(data))
