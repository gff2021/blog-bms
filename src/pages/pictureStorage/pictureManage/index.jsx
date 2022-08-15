import React, { useState } from 'react';
import { Form, Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import UploadModal from './uploadModal';

const PictureManage = () => {
	const [uploadModalVisible, setUploadModalVisible] = useState(false);

	const handleUpload = () => {
		setUploadModalVisible(true);
	}

	const closeUploadModal = () => {
		setUploadModalVisible(false)
	}

	const columns = [
		{
			title: '图片名称',
			dataIndex: 'imageName'
		},
		{
			title: '图片类型',
			dataIndex: 'imageType'
		}
	]

	return (
		<div className='picture-manage'>
			<div style={{ margin: '20px 0' }}>
				<Button type='primary' icon={<UploadOutlined />} onClick={handleUpload}>上传</Button>
			</div>
			<Table
				columns={columns}
			/>
			{
				uploadModalVisible && (
					<UploadModal modalVisible={uploadModalVisible} closeModal={closeUploadModal} />
				)
			}
		</div>
	)
};

export default PictureManage;