import React from 'react';
import { Form, Modal, Row, Col, Input, Select } from 'antd';
import { getOptions } from 'commonFunction';
import { modalTitleDic, albumStatusList } from '../../constants';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 }
}

const AlbumModal = (props) => {
	const { modalVisible, modalType, closeModal } = props;

	const modalTitle = modalTitleDic[modalType];
	const statusOptions = getOptions(albumStatusList);

	return (
		<Modal title={modalTitle} visible={modalVisible} onCancel={closeModal} footer={null} width={800}>
			<Form>
				<Row>
					<Col span={24}>
						<FormItem label='相册名称' name='albumName' {...formItemLayout}>
							<Input />
						</FormItem>
					</Col>
					<Col span={24}>
						<FormItem label='状态' name='status' {...formItemLayout} initialValue=''>
							<Select>
								{statusOptions}
							</Select>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default AlbumModal;