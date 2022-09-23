/**
 * @description 基于axios进行封装的接口请求模块
 * @author Guff <3204966069@qq.com>
 */

import axios from 'axios';
import { message } from 'antd';

// 响应拦截
axios.interceptors.response.use(function (response) {
	const { data: { status, msg } } = response;
	if (status >= 200 && status < 300) {
		if (msg) {
			message.success(msg);
		}
		return Promise.resolve(response.data);
	} else if (status >= 400 && status < 600) {
		if (msg) {
			message.error(msg);
		}
		return Promise.reject(response.data);
	}
}, function (error) {
	return Promise.reject(error)
});

class Request {
	getParams = (url, params) => {
		return new Promise((resolve, reject) => {
			axios.get(url, { params }).then((data) => {
				resolve(data)
			}).catch(err => {
				reject(err)
			})
		})
	}

	postJson = (url, data) => {
		return new Promise((resolve, reject) => {
			axios.post(url, data).then((data) => {
				resolve(data);
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default new Request();