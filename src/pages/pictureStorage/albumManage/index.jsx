import { Form, Row, Col, Input, Space, Button, Card, Table, Divider } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 }
}

const AlbumManage = () => {


	const columns = [
		{
			title: '相册名称',
			dataIndex: 'albumName'
		},
	];

	return (
		<div>
			<Form>
				<Row>
					<Col span={8}>
						<FormItem label='相册名称' name='albumName' {...formItemLayout}>
							<Input />
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='状态' name='status' {...formItemLayout}>
							<Input />
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col offset={2}>
						<Space>
							<Button type='primary'>查询</Button>
							<Button>重置</Button>
						</Space>
					</Col>
				</Row>
			</Form>
			<Divider />
			<div style={{ marginBottom: '20px' }}>
				<Button type='primary'>新建相册</Button>
			</div>
			<Table
				rowKey={record => record._id}
				columns={columns}
			/>
		</div>
	)
}

export default AlbumManage;