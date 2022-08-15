import React, { useState } from 'react';
import { Modal, Form, Upload, Select, Row, Col, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 }
}

const UploadModal = (props) => {
	const { modalVisible, closeModal } = props;

	const [fileList, setFileList] = useState([]);
	const [previewModalTitle, setPreviewModalTitle] = useState('');
	const [previewImg, setPreviewImg] = useState('');
	const [previewModalVisible, setPreviewModalVisible] = useState(false);

	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				return resolve(fileReader.result)
			};
			fileReader.onerror = (err) => {
				return reject(err)
			}
		})
	}

	const closePreviewModal = () => {
		setPreviewModalVisible(false);
	}

	const handleChange = ({ fileList }) => {
		setFileList(fileList);
	}

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImg(file.url || file.preview);
		setPreviewModalTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
		setPreviewModalVisible(true);
	}

	const handleRemove = (file) => {
		const index = fileList.indexOf(file);
		const newFileList = fileList.slice();
		newFileList.splice(index, 1);
		setFileList(newFileList);
	}

	const handleSubmit = (values) => {
		console.log(values);
	}

	const uploadProps = {
		action: '',
		fileList, // 文件列表
		listType: 'picture-card', // 文件列表类型
		multiple: true, // 是否支持多选
		maxCount: 8,
		beforeUpload: () => false, // 中断自动上传操作
		onChange: handleChange,
		onPreview: handlePreview, // 预览
		onRemove: handleRemove, // 移除
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	return (
		<Modal title='上传图片' visible={modalVisible} onCancel={closeModal} footer={null} width={700}>
			<Form onFinish={handleSubmit}>
				<FormItem label='相册' name='album' {...formItemLayout}>
					<Select></Select>
				</FormItem>
				<Row>
					<Col span={18} offset={4}>
						<Upload {...uploadProps}>
							{
								fileList.length >= 8 ? null : uploadButton
							}
						</Upload>
					</Col>
				</Row>
				<Row justify='center' style={{ marginTop: '20px' }}>
					<Space>
						<Button type='primary' htmlType='submit'>提交</Button>
						<Button onClick={closeModal}>取消</Button>
					</Space>
				</Row>
			</Form>
			{
				previewModalVisible && (
					<Modal visible={previewModalVisible} title={previewModalTitle} onCancel={closePreviewModal} width={800} footer={null}>
						<img src={previewImg} alt="厚礼蟹..." style={{ width: '100%' }} />
					</Modal>
				)
			}
		</Modal>
	)
}

export default UploadModal;