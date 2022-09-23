import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import storage from '../../utils/storage';
import NavBar from '../../components/navBar';
import AdminHeader from '../../components/header';
import menuList from '../../routerConfig';
import './index.less';

const { Content, Footer } = Layout;

const mapMenuListToRoutes = (menuList) => {
	return menuList.map((item) => {
		if (item.children) {
			return mapMenuListToRoutes(item.children)
		} else {
			return <Route key={item.key} path={item.key} component={item.component}></Route>
		}
	})
}

const Admin = (props) => {
	const user = storage.getUser();

	return (!user || !user._id) ? <Redirect to='/admin/login' /> :
		(
			<Layout className='admin' style={{ minHeight: '1000px' }}>
				<NavBar />
				<Layout>
					<AdminHeader user={user} />
					<Content className='admin-content'>
						<Switch>
							{
								mapMenuListToRoutes(menuList)
							}
							<Redirect to='/admin/home' />
						</Switch>
					</Content>
					<Footer className='admin-footer'>
						<span>Copyright</span>
					</Footer>
				</Layout>
			</Layout>
		)
};

export default Admin;