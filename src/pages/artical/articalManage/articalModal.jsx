import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, Tag, Row, Col } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import RichTextEditor from '@/components/richTextEditor';
import { reqCreateArtical, reqUpdateArtical } from '@/api/articalManage';
import { articalStatusDic } from '@/constants/dictionary';
import { getModalTitle } from '@/constants/commonFunc';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

const CreateModal = (props) => {
	const [form] = Form.useForm();

	const {
		tagList,
		modalType,
		articalModalVisible,
		setArticalModalVisible,
		getArticalList,
		recordData
	} = props;

	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty()
	);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);
	const [isReadOnly, setIsReadOnly] = useState(false);

	const handleSaveArtical = () => {
		form.validateFields().then(values => {
			const contentState = editorState.getCurrentContent();
			const rawContentState = convertToRaw(contentState);
			const markup = draftToHtml(
				rawContentState,
			);
			const input = {
				title: values.title,
				categoryId: values.category,
				status: values.status,
				content: markup,
			};
			if (modalType === 'create') {
				input.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
				reqCreateArtical(input).then(() => {
					getArticalList();
					setArticalModalVisible(false);
				})
			} else if (modalType === 'update') {
				input.id = recordData._id;
				input.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
				reqUpdateArtical(input).then(() => {
					getArticalList();
					setArticalModalVisible(false);
				})
			}
		})
	}

	const handleSubmit = () => {
		handleSaveArtical();
	}

	const handleCloseArticalModal = () => {
		if (modalType === 'create' || modalType === 'update') {
			setConfirmModalVisible(true);
		} else if (modalType === 'check') {
			setArticalModalVisible(false);
		}
	}

	const handleSaveAndClose = () => {
		handleCloseConfirmModal();
		handleSaveArtical();
	}

	const handleJustClose = () => {
		handleCloseConfirmModal();
		setArticalModalVisible(false);
	}

	const handleCloseConfirmModal = () => {
		setConfirmModalVisible(false);
	}

	useEffect(() => {
		if (modalType === 'check' || modalType === 'update') {
			const markup = recordData && recordData.content;
			const blocksFromHTML = convertFromHTML(markup);
			const defaultState = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
			setEditorState(EditorState.createWithContent(defaultState));
		}
	}, []);

	useEffect(() => {
		if (modalType === 'check') {
			setIsReadOnly(true);
		}
	}, [])

	const confirmModalTitle = (
		<div style={{ fontSize: '20px' }}>
			<ExclamationCircleTwoTone twoToneColor="gold" style={{ paddingRight: '5px' }} />
			<span>提示</span>
		</div>
	)

	return (
		<div>
			<Modal
				title={getModalTitle(modalType)}
				visible={articalModalVisible}
				width={1300}
				footer={null}
				onCancel={handleCloseArticalModal}
			>
				<Form form={form}>
					<Row>
						<Col span={24}>
							<FormItem
								label='标题'
								name='title'
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 21 }}
								rules={[{ required: true, message: '请输入文章标题' }]}
								initialValue={modalType === 'check' || modalType === 'update' ? (recordData.title ? recordData.title : null) : null}
							>
								<Input />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem
								label='分类'
								name='category'
								labelCol={{ span: 4 }}
								wrapperCol={{ span: 20 }}
								rules={[{ required: true, message: '请选择文章分类' }]}
								initialValue={modalType === 'check' || modalType === 'update' ? (recordData.category._id ? recordData.category._id : null) : null}
							>
								<Select showSearch allowClear>
									{
										tagList && tagList.map(item => {
											return <Option key={item._id}><Tag color={item.color}>{item.title}</Tag></Option>
										})
									}
								</Select>
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem
								label='状态'
								name='status'
								labelCol={{ span: 4 }}
								wrapperCol={{ span: 18 }}
								rules={[{ required: true, message: '请选择状态' }]}
								initialValue={modalType === 'check' || modalType === 'update' ? (recordData.status ? recordData.status : null) : null}
							>
								<Select allowClear>
									{
										articalStatusDic.map((item) => {
											return <Option key={item.value} value={item.value}>{item.description}</Option>
										})
									}
								</Select>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Row style={{ marginBottom: '24px' }}>
					<Col span={21} offset={2}>
						<RichTextEditor editorState={editorState} setEditorState={setEditorState} isReadOnly={isReadOnly} />
					</Col>
				</Row>
				<Row>
					<Col span={24} style={{ textAlign: 'center' }}>
						<Space>
							<Button type='primary' onClick={handleSubmit} style={{ display: modalType === 'check' ? 'none' : 'block' }}>保存</Button>
							<Button onClick={handleCloseArticalModal}>取消</Button>
						</Space>
					</Col>
				</Row>
			</Modal>
			<Modal visible={confirmModalVisible} title={confirmModalTitle} footer={null} onCancel={handleCloseConfirmModal}>
				<Row style={{ marginBottom: '20px' }}>
					<h3>编辑的内容还没有保存，确认要关闭吗？</h3>
				</Row>
				<Row>
					<Col span={24} style={{ textAlign: 'right' }}>
						<Space>
							<Button type='primary' onClick={handleSaveAndClose}>保存并关闭</Button>
							<Button type='primary' danger onClick={handleJustClose}>直接关闭</Button>
							<Button onClick={handleCloseConfirmModal}>取消</Button>
						</Space>
					</Col>
				</Row>
			</Modal>
		</div>
	)
}

export default CreateModal;