import axios from 'axios'

export function request(config) {
//    1. 创建实例
    const instance = axios.create({
        // baseURL: "https://www.easy-mock.com/mock/5d3e479814694078919f952c/supermall",
        baseURL: "http://123.207.32.32:8000",
        timeout: 5000
    })
//    2. 配置拦截器
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        console.log(error);
    })

//    3. 相应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, error => {
        console.log(error);
    })

//    4. 发送请求
    return instance(config)
}
