import request from 'request';

const baseURL = '/admin-blog-cms/journal';

// 查询日志
export const reqQueryJournals = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/queryJournalList', params).then((output) => {
            resolve(output);
        }).catch((err) => {
            reject(err);
        })
    })
}

// 新建日志
export const reqCreateJournal = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/createJournal', params).then((output) => {
            resolve(output);
        }).catch((err) => {
            reject(err)
        })
    })
}

// 编辑日志
export const reqUpdateJournal = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/updateJournal', params).then((output) => {
            resolve(output);
        }).catch((err) => {
            reject(err)
        })
    })
}

// 删除日志
export const reqDeleteJournal = (params) => {
    return new Promise((resolve, reject) => {
        request.postJson(baseURL + '/deleteJournal', params).then((output) => {
            resolve(output);
        }).catch((err) => {
            reject(err)
        })
    })
}