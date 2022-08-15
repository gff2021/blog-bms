// 获取弹窗title
export function getModalTitle(modalType) {
    switch (modalType) {
        case 'create':
            return '新建';
        case 'check':
            return '查看';
        case 'update':
            return '编辑';
        default:
            return '';
    }
}