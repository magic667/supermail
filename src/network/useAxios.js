import axios from 'axios'

export default function useAxios(config) {
    const axiosInstance = axios.create({
        baseURL: "http://152.136.185.210:7878/api/m5",
        timeout: 5000,
    })

    // 拦截器
    // axiosInstance.interceptors.request.use(config => {
    //     console.log(config);
    //     return config
    // }, err => {
    //     console.log(err);
    // })
    // axiosInstance.interceptors.response.use(config => {
    //     console.log(config);
    //     return config.data
    // }, err => {
    //     console.log(err);
    // })

    // 发送网络请求，返回的是 Promise 对象
    return axiosInstance(config)
}