import { Modal, Form, Input, Button, Space, Row } from 'antd';
import moment from 'moment';
import { reqCreateJournal, reqUpdateJournal } from '@/api/journal';
import { getModalTitle } from '@/constants/commonFunc';

const FormItem = Form.Item;
const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 }
}

const JournalModal = (props) => {
	const [form] = Form.useForm();

	const {
		modalType,
		modalVisible,
		closeModal,
		recordData,
		queryJournals,
	} = props;

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			if (modalType === 'create') {
				const input = {
					...values,
					createTime: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				return reqCreateJournal(input).then(() => {
					closeModal();
					queryJournals();
				});
			} else if (modalType === 'update') {
				const input = {
					...values,
					id: recordData._id,
					updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				reqUpdateJournal(input).then(() => {
					closeModal();
					queryJournals();
				});
			}
		})
	}

	return (
		<Modal
			title={getModalTitle(modalType)}
			width={800}
			visible={modalVisible}
			onCancel={closeModal}
			footer={null}
		>
			<Form
				{...formLayout}
				form={form}
				onFinish={handleSubmit}
			>
				<FormItem
					label='摘要'
					name='abstract'
					rules={[
						{
							required: true,
							message: '摘要不能为空',
						},
					]}
					initialValue={modalType === 'create' ? null : recordData.abstract ? recordData.abstract : null}
				>
					<Input disabled={modalType === 'check' ? true : false} />
				</FormItem>
				<FormItem
					label='内容'
					name='content'
					initialValue={modalType === 'create' ? null : recordData.content ? recordData.content : null}
				>
					<TextArea
						showCount
						autoSize={{ minRows: 6 }}
						maxLength={200}
						disabled={modalType === 'check' ? true : false}
					/>
				</FormItem>
				<Row justify='center'>
					<Space>
						<Button type='primary' htmlType='submit'>保存</Button>
						<Button type='primary' onClick={closeModal}>取消</Button>
					</Space>
				</Row>
			</Form>
		</Modal>
	)
}

export default JournalModal;