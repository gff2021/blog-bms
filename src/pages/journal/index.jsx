import { useState, useEffect } from 'react';
import { Table, Space, Button, Modal } from 'antd';
import { reqQueryJournals, reqDeleteJournal } from '@/api/journal';
import JournalModal from './journalModal';

const { confirm } = Modal;

const Journal = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [journalListSelectedKeys, setJournalListSelectedKeys] = useState([]);
	const [modalType, setModalType] = useState('');
	const [dataSource, setDataSource] = useState([]);
	const [recordData, setRecordData] = useState({});
	const [loading, setLoading] = useState(true);
	const [pageInfo, setPageInfo] = useState({ pageNo: 1, pageSize: 10 });
	const [total, setTotal] = useState(100);

	const queryJournals = () => {
		const input = { pageInfo };
		reqQueryJournals(input).then((output) => {
			const { result: { dataList, total } } = output;
			setLoading(false);
			setDataSource(dataList);
			setTotal(total)
		});
	}

	const handleCreate = () => {
		setRecordData({});
		setModalType('create');
		setModalVisible(true);
	}

	const handleUpdate = (record) => {
		setModalType('update');
		setRecordData(record);
		setModalVisible(true);
	}

	const handleDelete = (record) => {
		const input = {
			id: record._id
		}
		confirm({
			title: '提示',
			content: '确定要删除该条数据吗？',
			okText: '确定',
			cancelText: '取消',
			onOk: () => {
				return reqDeleteJournal(input).then((output) => {
					queryJournals();
				})
			}
		})
	}

	const closeModal = () => {
		setModalVisible(false)
	}

	const handlePageInfoChange = (newPage, newPageSize) => {
		if (newPageSize !== pageInfo.pageSize) {
			setPageInfo({
				pageNo: 1,
				pageSize: newPageSize
			});
		} else {
			setPageInfo({
				pageNo: newPage,
				pageSize: newPageSize
			});
		}
		setLoading(true);
	}

	useEffect(() => {
		queryJournals();
	}, [])

	// 分页器の监视
	useEffect(() => {
		queryJournals();
	}, [pageInfo])

	const rowSelection = {
		selectedRowKeys: journalListSelectedKeys,
		onChange: (selectedKeys) => {
			setJournalListSelectedKeys(selectedKeys);
		}
	}

	const pagination = {
		current: pageInfo.pageNo,
		pageSize: pageInfo.pageSize,
		total: total,
		showSizeChanger: true,
		onChange: handlePageInfoChange
	}

	const columns = [
		{
			title: '序号',
			dataIndex: '_id',
			width: '5%',
			align: 'center',
			render: (...args) => {
				return args[2] / 1 + 1
			}
		},
		{
			title: '摘要',
			dataIndex: 'abstract',
			key: 'abstract',
			ellipsis: true,
			width: '20%'
		},
		{
			title: '内容',
			dataIndex: 'content',
			key: 'content',
			ellipsis: true
		},
		{
			title: '发布时间',
			dataIndex: 'createTime',
			key: 'createTime',
			align: 'center',
			width: '15%'
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			key: 'updateTime',
			align: 'center',
			width: '15%'
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			width: '15%',
			render: (text, record) => (
				<Space size="middle">
					<Button type='primary' onClick={() => { handleUpdate(record) }}>编辑</Button>
					<Button danger onClick={() => { handleDelete(record) }}>删除</Button>
				</Space>
			),
		},
	];

	return (
		<div className="journal">
			<div style={{ margin: '20px 0' }}>
				<Button type='primary' onClick={handleCreate}>新建日志</Button>
			</div>
			<Table
				bordered
				columns={columns}
				dataSource={dataSource}
				rowKey={record => record._id}
				rowSelection={rowSelection}
				pagination={pagination}
				loading={loading}
			/>
			{
				modalVisible && (
					<JournalModal
						modalType={modalType}
						modalVisible={modalVisible}
						closeModal={closeModal}
						recordData={recordData}
						queryJournals={queryJournals}
					/>
				)
			}
		</div>
	)
}

export default Journal;