/* 封装接口函数 */
import request from 'request';
import jsonp from 'jsonp';

const baseURL = '/admin-blog-cms';

// 发送登陆请求
export const reqLogin = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/login', params).then((output) => {
            resolve(output);
        }).catch((err) => {
            reject(err);
        })
    });
}

// 高德天气api
export const reqWhether = () => {
    const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=1840159ebe25a3f5323d5dccfa872e46&city=110000&output=JSON';
    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.lives[0])
            }
        })
    })
}