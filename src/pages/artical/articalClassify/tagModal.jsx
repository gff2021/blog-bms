import { useState } from 'react';
import { Modal, Form, Input, Space, Button, Row, Tag, Select } from 'antd';
import { SketchPicker } from 'react-color';
import moment from 'moment';
import { reqCreateTag, reqUpdateTag } from '@/api/tagManage';
import { tagStatusDic } from '@/constants/dictionary';
import { getModalTitle } from '@/constants/commonFunc';

const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 }
};

const CreateModal = (props) => {
	const [form] = Form.useForm();

	const {
		modalType,
		modalVisible,
		closeModal,
		queryTableList,
		recordData
	} = props;

	const [title, setTitle] = useState(() => {
		if (modalType === 'create') {
			return ''
		} else if (modalType === 'update') {
			return recordData.title
		}
	});
	const [color, setColor] = useState(() => {
		if (modalType === 'create') {
			return '#000'
		} else if (modalType === 'update') {
			return recordData.color
		}
	});

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	}

	const handleColorChange = (color) => {
		setColor(color.hex);
	}

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			if (modalType === 'create') {
				const input = {
					...values,
					color,
					createTime: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				reqCreateTag(input).then(() => {
					closeModal();
					queryTableList();
				});
			} else if (modalType === 'update') {
				const input = {
					...values,
					color,
					id: recordData._id,
					updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				reqUpdateTag(input).then(() => {
					closeModal();
					queryTableList();
				});
			}
		})
	}

	return (
		<Modal
			title={getModalTitle(modalType)}
			width={600}
			visible={modalVisible}
			onCancel={closeModal}
			footer={null}
		>
			<Form form={form} {...formLayout} onFinish={handleSubmit}>
				<FormItem
					label='标题'
					name='title'
					rules={
						[
							{
								required: true,
								message: '标题不能为空'
							}
						]
					}
					initialValue={modalType === 'create' ? null : recordData.title ? recordData.title : null}
				>
					<Input onChange={handleTitleChange} />
				</FormItem>
				<FormItem label='颜色'>
					<div style={{ color: '#000' }}>
						<SketchPicker color={color} onChange={handleColorChange} disableAlpha={true} />
					</div>
				</FormItem>
				<FormItem label='预览'>
					<Tag color={color}>{title}</Tag>
				</FormItem>
				<FormItem
					label='状态'
					name='status'
					initialValue={modalType === 'create' ? null : recordData.status}
					rules={
						[
							{
								required: true,
								message: '请选择状态'
							}
						]
					}
				>
					<Select>
						{
							tagStatusDic.map((item) => {
								return <Option key={item.value} value={item.value}>{item.description}</Option>
							})
						}
					</Select>
				</FormItem>
				<Row justify='center'>
					<Space>
						<Button type='primary' htmlType='submit'>确定</Button>
						<Button type='primary' onClick={closeModal}>取消</Button>
					</Space>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreateModal;