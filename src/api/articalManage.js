import ajax from './ajax';

const baseURL = '/admin-blog-cms/articalClassify/articalManage';

// 查询文章列表
export const reqQueryArticals = (params) => {
    return new Promise((resolve, reject) => {
        ajax.postJson(baseURL + '/queryArticalList', params).then(output => {
            resolve(output)
        }).catch(err => {
            reject(err)
        })
    })
}

// 新建文章
export const reqCreateArtical = (params) => {
    return new Promise((resolve, reject) => {
        ajax.postJson(baseURL + '/createArtical', params).then(output => {
            resolve(output)
        }).catch(err => {
            reject(err)
        })
    })
}

// 编辑文章
export const reqUpdateArtical = (params) => {
    return new Promise((resolve, reject) => {
        ajax.postJson(baseURL + '/updateArtical', params).then(output => {
            resolve(output)
        }).catch(err => {
            reject(err)
        })
    })
}

// 删除文章
export const reqDeleteArtical = (params) => {
    return new Promise((resolve, reject) => {
        ajax.postJson(baseURL + '/deleteArtical', params).then(output => {
            resolve(output)
        }).catch(err => {
            reject(err)
        })
    })
}