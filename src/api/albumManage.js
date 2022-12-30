import request from 'request';

const baseURL = '/admin-blog-cms/pictureStorage/albumManage';

// 新建相册
export const reqCreateAlbum = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/createAlbum', params).then(output => {
            resolve(output)
        }).catch(err => {
            reject(err)
        })
    })
}