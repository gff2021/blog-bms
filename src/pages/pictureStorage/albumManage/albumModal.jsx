import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Select, Button, Space, Upload } from 'antd';
import { getOptions } from 'commonFunction';
import { modalTitleDic, albumStatusList } from '../../constants';
import { reqCreateAlbum } from '@/api/albumManage';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 }
}

const AlbumModal = (props) => {
	const { modalVisible, modalType, closeModal } = props;
	const [fileList, setFileList] = useState([]);

	const handleReadFile = (file) => {
		const fileReader = new FileReader();
		return new Promise((resolve, reject) => {
			fileReader.onload = () => {
				resolve(fileReader.result)
			}
			fileReader.onerror = () => {
				reject(new Error(`Error occurred reading file: ${file.name}`))
			}
			// fileReader.readAsArrayBuffer(file); // 缓冲数组
			// fileReader.readAsBinaryString(file); // 二进制
			fileReader.readAsDataURL(file); // data:URL;base64
			// fileReader.readAsText(file); // 字符串
		})
	}

	const handleSubmit = (values) => {
		console.log('values', values);
		handleReadFile(values.coverImg.file).then(res => {
			console.log('result', res);
			reqCreateAlbum({
				...values,
				coverImg: res
			})
		});
	}

	const handleFileChange = ({ fileList }) => {
		setFileList(fileList);
	}

	const modalTitle = modalTitleDic[modalType];
	const uploadProps = {
		accept: 'image/*',
		// action: '',
		fileList,
		listType: "picture-card",
		beforeUpload: () => false,
		onChange: handleFileChange,
	};
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	return (
		<Modal title={modalTitle} visible={modalVisible} onCancel={closeModal} footer={null} width={800}>
			<Form onFinish={handleSubmit}>
				<Row>
					<Col span={24}>
						<FormItem label='相册名称' name='albumName' {...formItemLayout} rules={[{ required: true, message: '请输入相册名称' }]}>
							<Input />
						</FormItem>
					</Col>
					<Col span={24}>
						<FormItem label='状态' name='status' {...formItemLayout} initialValue='' rules={[{ required: true, message: '请选择状态' }]}>
							<Select>
								{getOptions(albumStatusList)}
							</Select>
						</FormItem>
					</Col>
					<Col span={24}>
						<FormItem label='封面' name='coverImg' {...formItemLayout} initialValue='' rules={[{ required: true, message: '请上传封面' }]}>
							<Upload {...uploadProps}>
								{/* {fileList.length >= 1 ? null : uploadButton} */}
								{uploadButton}
							</Upload>
						</FormItem>
					</Col>
					<Col span={24} style={{ textAlign: 'center' }}>
						<Space>
							<Button type='primary' htmlType='submit'>提交</Button>
							<Button onClick={closeModal}>取消</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default AlbumModal;