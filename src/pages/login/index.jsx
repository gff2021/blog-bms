import { Form, Input, Button, Space, Row, Col } from 'antd';
import { Redirect } from 'react-router-dom';
import {
	MailOutlined,
	LockFilled,
} from '@ant-design/icons';
import { reqLogin } from '@/api/index';
import storage from '@/utils/storage';
import './index.less';
import logo from '@/assets/images/loginLogo.jpg';

const FormItem = Form.Item;

const Login = (props) => {
	const [form] = Form.useForm();

	const user = storage.getUser();

	const handleLogin = () => {
		form.validateFields().then(values => {
			const input = { ...values };
			reqLogin(input).then((res) => {
				const { result } = res;
				storage.saveUser(result.user);
				props.history.replace('/admin');
			}).catch(err => {
				console.log(err);
			})
		})
	}

	// 如果用户已经登陆，重定向到主页
	return (user && user.id) ? <Redirect to='/admin' /> :
		(
			<div className='login'>
				<div className="login-header">
					<div className="main">
						<img src={logo} alt="." className='login-logo' />
						<p className="login-title">博客管理系统</p>
					</div>
				</div>
				<div className="login-content">
					<h2>用户登录</h2>
					<Form form={form}>
						<FormItem
							label="邮箱"
							name="email"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}
							rules={[
								{ required: true, message: '邮箱不能为空' },
								{ pattern: /^[a-zA-Z0-9_\-]{2,}@[a-zA-Z0-9_\-]{2,}(\.[a-zA-Z0-9_\-]+){1,2}$/, message: '邮箱格式不正确，请重新输入' }
							]}
						>
							<Input prefix={<MailOutlined style={{ color: '#000', fontSize: '18px' }} />} placeholder="Email" />
						</FormItem>
						<FormItem
							label="密码"
							name="password"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}
							rules={[
								{ required: true, message: '请输入密码' },
								{ min: 6, message: '密码长度不得少于6位' },
								{ max: 12, message: '密码长度不得超过12位' }
							]}
						>
							<Input type='password' prefix={<LockFilled style={{ color: '#000', fontSize: '18px' }} />} placeholder="Password" />
						</FormItem>
						<Row style={{ textAlign: 'center' }}>
							<Col span={24}>
								<Space>
									<Button type="primary" ghost onClick={handleLogin}>登录</Button>
									<Button type="primary" ghost>注册</Button>
									<Button type="primary" ghost>游客登录</Button>
								</Space>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		)
};

export default Login;