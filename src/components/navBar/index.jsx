import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../routerConfig';
import './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

const mapMenuListToLinks = (menuList) => {
	return menuList.map((item) => {
		if (!item.children) {
			return (
				<Menu.Item key={item.key} icon={item.icon}>
					<Link to={item.key}>{item.title}</Link>
				</Menu.Item>
			)
		} else {
			return (
				<SubMenu key={item.key} title={item.title} icon={item.icon}>
					{
						mapMenuListToLinks(item.children)
					}
				</SubMenu>
			)
		}
	})
}

const NavBar = (props) => {
	const [collapsed, setCollapsed] = useState(false);
	const [selectedKeys, setSelectedKeys] = useState(() => {
		return props.location.pathname;
	});

	const [openKeys, setOpenKeys] = useState(() => {
		const pathname = props.location.pathname;
		return pathname.lastIndexOf('/') === 0 ? pathname : pathname.slice(0, pathname.lastIndexOf('/'));
	})

	const updateSelectedKeys = (opt) => {
		setSelectedKeys(() => {
			return opt.key
		})
	}

	const updateOpenKeys = (keys) => {
		setOpenKeys(keys[keys.length - 1]);
	}

	const toggle = () => {
		setCollapsed(!collapsed);
	}

	return (
		<Sider className='nav' collapsed={collapsed}>
			<div className="nav-header" style={{ padding: collapsed ? '10px 20px' : '10px 16px 10px 24px', textAlign: collapsed ? 'center' : 'left' }}>
				<span className='nav-header-trigger' onClick={toggle}>
					{
						collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
					}
				</span>
				<span className='nav-header-title' style={{ display: collapsed ? 'none' : 'inline' }}>博客后台</span>
			</div>
			<Menu
				selectedKeys={[selectedKeys]}
				defaultOpenKeys={[openKeys]}
				openKeys={[openKeys]}
				mode='inline'
				onClick={updateSelectedKeys}
				onOpenChange={updateOpenKeys}
			>
				{
					mapMenuListToLinks(menuList)
				}
			</Menu>
		</Sider>
	)
}

export default withRouter(NavBar);