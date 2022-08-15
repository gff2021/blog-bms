/* 用于进行local数据存储的工具模块 */

const USER_KEY = 'user_key';

export default {
    // 保存用户
    saveUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    // 读取用户
    getUser: () => {
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    },

    // 删除用户
    removeUser: () => {
        localStorage.removeItem(USER_KEY);
    }
}