import { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Modal } from 'antd';
import TagModal from './tagModal';
import { reqQueryTags, reqDeleteTags } from '@/api/tagManage';
import { getTextByValue } from 'commonFunction';
import { tagStatusList } from '../../constants';
import './index.less';

const { confirm } = Modal;

const ArticalClassify = () => {
	const [modalType, setModalType] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [recordData, setRecordData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNo: 1, pageSize: 10 });
	const [total, setTotal] = useState(100);
	const [loading, setLoading] = useState(true);

	const queryTableList = () => {
		const input = { pageInfo };
		reqQueryTags(input).then(output => {
			const { result: { dataList, total } } = output;
			setLoading(false);
			setDataSource(dataList);
			setTotal(total);
		})
	}

	const handleCreate = () => {
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
				return reqDeleteTags(input).then(() => {
					queryTableList();
				})
			},
		})
	}

	const closeModal = () => {
		setModalVisible(false);
	}

	const handleSelectedChange = (selectedKeys) => {
		setSelectedKeys(selectedKeys);
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
		};
		setLoading(true);
	}

	useEffect(() => {
		queryTableList();
	}, [])

	// 分页器の监视
	useEffect(() => {
		queryTableList();
	}, [pageInfo])

	const columns = [
		{
			title: '序号',
			dataIndex: '_id',
			align: 'center',
			width: '5%',
			render: (...args) => args[2] / 1 + 1
		},
		{
			title: '标题',
			dataIndex: 'title',
			align: 'center'
		},
		{
			title: '颜色',
			dataIndex: 'color',
			align: 'center'
		},
		{
			title: '标签',
			dataIndex: 'tag',
			align: 'center',
			render: (...args) => {
				return <Tag color={args[1].color}>{args[1].title}</Tag>
			}
		},
		{
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			render: (...args) => {
				return getTextByValue(args[0], tagStatusList);
			}
		},
		{
			title: '文章数量',
			dataIndex: 'articalCount',
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			align: 'center',
			width: '15%'
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			align: 'center',
			width: '15%'
		},
		{
			title: '操作',
			dataIndex: 'operation',
			align: 'center',
			width: '15%',
			render: (...args) => {
				return (
					<Space size="middle">
						<Button type='primary' onClick={() => { handleUpdate(args[1]) }}>编辑</Button>
						<Button danger onClick={() => { handleDelete(args[1]) }}>删除</Button>
					</Space>
				)
			}
		}
	];

	const rowSelection = {
		selectedRowKeys: selectedKeys,
		onChange: handleSelectedChange
	}

	// 分页器配置项
	const pagination = {
		current: pageInfo.pageNo,
		pageSize: pageInfo.pageSize,
		total: total,
		showSizeChanger: true,
		onChange: handlePageInfoChange
	}

	return (
		<div className="tag-manage">
			<div className='tag-manage-btns'>
				<Button type='primary' onClick={handleCreate}>新建标签</Button>
			</div>
			<Table
				bordered
				rowKey={record => record._id}
				columns={columns}
				dataSource={dataSource}
				rowSelection={rowSelection}
				pagination={pagination}
				loading={loading}
			/>
			{
				modalVisible && (
					<TagModal
						modalType={modalType}
						modalVisible={modalVisible}
						closeModal={closeModal}
						queryTableList={queryTableList}
						recordData={recordData}
					/>
				)
			}
		</div>
	)
};

export default ArticalClassify;