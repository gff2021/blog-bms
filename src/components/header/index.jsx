import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Space, Menu, message } from 'antd';
import { DownOutlined, BulbFilled, BulbOutlined } from '@ant-design/icons';
import moment from 'moment';
import eventProxy from '../../utils/eventProxy';
import storage from '../../utils/storage';
import { reqWhether } from '../../api';
import logo from '../../assets/images/loginLogo.jpg';
import './index.less';

const MenuItem = Menu.Item;

const menu = (
    <Menu>
        <MenuItem key="0">
            <span>用户设置</span>
        </MenuItem>
        <MenuItem key="1">
            <span>回到首页</span>
        </MenuItem>
        <Menu.Divider />
        <MenuItem key="3" onClick={() => { eventProxy.$trigger('exit') }}>
            <span>退出登录</span>
        </MenuItem>
    </Menu>
);

const AdminHeader = (props) => {
    const {
        user: {
            username
        }
    } = props;

    const [time, setTime] = useState(() => {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    });
    const [city, setCity] = useState('北京市');
    const [weather, setWeather] = useState('晴');


    useEffect(() => {
        eventProxy.$one('exit', () => {
            storage.removeUser();
            props.history.replace('/login');
        })
        const timer = setInterval(() => {
            setTime(() => {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            });
        });
        reqWhether().then((res) => {
            setCity(res.city);
            setWeather(res.weather);
        }).catch(() => {
            message.error('获取天气信息失败');
        })
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className='header'>
            <div className="header-reminder">
                <Space>
                    <span>{time}</span>
                    <span>{city}</span>
                    <span>{weather}</span>
                </Space>
            </div>
            <div className="header-dropdown">
                <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {username ? username : '游客'} <DownOutlined />
                    </a>
                </Dropdown>
            </div>
            <div className='header-photo'>
                <img src={logo} alt='logo' />
            </div>
        </div>
    )
}

export default withRouter(AdminHeader);