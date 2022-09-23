import request from 'request';

const baseURL = '/admin-blog-cms/articalClassify/tagManage';

// 查询标签列表
export const reqQueryTags = (params) => {
	return new Promise((resolve, reject) => {
		request.postJson(baseURL + '/queryTagList', params).then((output) => {
			resolve(output);
		}).catch((err) => {
			reject(err);
		})
	})
}

// 新建标签
export const reqCreateTag = (params) => {
	return new Promise((resolve, reject) => {
		request.postJson(baseURL + '/createTag', params).then(output => {
			resolve(output)
		}).catch(err => {
			reject(err)
		})
	})
}

// 编辑标签
export const reqUpdateTag = (params) => {
	return new Promise((resolve, reject) => {
		request.postJson(baseURL + '/updateTag', params).then(output => {
			resolve(output)
		}).catch(err => {
			reject(err)
		})
	})
}

// 删除标签
export const reqDeleteTags = (params) => {
	return new Promise((resolve, reject) => {
		request.postJson(baseURL + '/deleteTag', params).then(output => {
			resolve(output)
		}).catch(err => {
			reject(err)
		})
	})
}

// 标签列表模糊查询
export const reqAllTags = (params) => {
	return new Promise((resolve, reject) => {
		request.postJson(baseURL + '/requestAllTags', params).then(output => {
			resolve(output)
		}).catch(err => {
			reject(err)
		})
	})
}