import {
    HomeOutlined,
    ProfileOutlined,
    ReadOutlined,
    TagsOutlined,
    PictureOutlined,
    LockOutlined,
    SmileOutlined,
    TeamOutlined,
    UserSwitchOutlined,
    DatabaseOutlined,
    UnorderedListOutlined,
    FolderOpenOutlined,
    FileImageOutlined
} from '@ant-design/icons';
import Home from './pages/home';
import ArticalClassify from './pages/artical/articalClassify';
import ArticalManage from './pages/artical/articalManage';
import Jotting from './pages/jotting';
import AlbumManage from './pages/pictureStorage/albumManage';
import PictureManage from './pages/pictureStorage/pictureManage';
import User from './pages/authority/user';
import Role from './pages/authority/role';
import Resource from './pages/authority/resource';
import Journal from './pages/journal';

const menuList = [
    {
        title: '首页',
        key: '/admin/home',
        component: Home,
        icon: <HomeOutlined />,
    },
    {
        title: '文章',
        key: '/admin/artical',
        icon: <ReadOutlined />,
        children: [
            {
                title: '分类',
                key: '/admin/artical/articalClassify',
                component: ArticalClassify,
                icon: <TagsOutlined />
            },
            {
                title: '文章管理',
                key: '/admin/artical/articalManage',
                component: ArticalManage,
                icon: <ProfileOutlined />
            },
        ]
    },
    {
        title: '随笔',
        key: '/admin/jotting',
        component: Jotting,
        icon: <SmileOutlined />,
    },
    {
        title: '图库',
        key: '/admin/pictureStorage',
        icon: <PictureOutlined />,
        children: [
            {
                title: '相册',
                key: '/admin/pictureStorage/albumManage',
                component: AlbumManage,
                icon: <FolderOpenOutlined />
            },
            {
                title: '图片管理',
                key: '/admin/pictureStorage/PictureManage',
                component: PictureManage,
                icon: <FileImageOutlined />
            }
        ]
    },
    {
        title: '权限管理',
        key: '/admin/authority',
        icon: <LockOutlined />,
        children: [
            {
                title: '用户管理',
                key: '/admin/authority/user',
                component: User,
                icon: <TeamOutlined />
            },
            {
                title: '角色管理',
                key: '/admin/authority/role',
                component: Role,
                icon: <UserSwitchOutlined />
            },
            {
                title: '资源管理',
                key: '/admin/authority/resource',
                component: Resource,
                icon: <DatabaseOutlined />
            }
        ]
    },
    {
        title: '日志',
        key: '/admin/log',
        component: Journal,
        icon: <UnorderedListOutlined />,
    }
];

export default menuList;