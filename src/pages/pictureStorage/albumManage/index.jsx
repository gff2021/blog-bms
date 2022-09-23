import React, { useState } from 'react';
import { Form, Row, Col, Input, Space, Button, Card, Table } from 'antd';
import AlbumModal from './albumModal';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 }
}

const AlbumManage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState('create');

	const handleCreateAlbum = () => {
		setModalType('create');
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	}

	const columns = [
		{
			title: '相册名称',
			dataIndex: 'albumName'
		},
		{
			title: '状态',
			dataIndex: 'status'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime'
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime'
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: () => {
				return <div>
					<Button>编辑</Button>
					<Button>删除</Button>
				</div>
			}
		},
	];

	return (
		<div>
			<Card bordered={false} style={{ margin: '0 0 20px 0' }}>
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
			</Card>
			<Card bordered={false}>
				<div style={{ margin: '0 0 20px 0' }}>
					<Button type='primary' onClick={handleCreateAlbum}>新建相册</Button>
				</div>
				<Table
					rowKey={record => record._id}
					columns={columns}
				/>
			</Card>
			{
				modalVisible && <AlbumModal modalVisible={modalVisible} modalType={modalType} closeModal={closeModal} />
			}
		</div>
	)
}

export default AlbumManage;