import { useState, useEffect } from 'react';
import { Space, Button, Table, Modal, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ArticalModal from './articalModal';
import { reqAllTags } from '@/api/tagManage'
import { reqQueryArticals, reqDeleteArtical } from '@/api/articalManage';
import { getTextByValue } from 'commonFunction';
import { articalStatusList } from '../../constants';

const ArticalManage = () => {
	const [tagList, setTagList] = useState([]);
	const [articalList, setArticalList] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		showTotal: total => '共' + total + '条',
		showSizeChanger: true,
		pageSizeOptions: ['10', '20', '30', '40', '50'],
	});
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [articalModalVisible, setArticalModalVisible] = useState(false);
	const [recordData, setRecordData] = useState();

	const getTagList = () => {
		reqAllTags().then(res => {
			const { result: { dataList } } = res;
			setTagList(dataList)
		}).catch(err => {
			Modal.error(err);
		});
	}

	const getArticalList = () => {
		const input = {
			pageInfo: {
				pageNo: pagination.current,
				pageSize: pagination.pageSize
			}
		};
		setLoading(true);
		reqQueryArticals(input).then(res => {
			const { result: { total, dataList } } = res;
			setArticalList(dataList);
			setTotal(total);
		}).finally(() => {
			setLoading(false);
		})
	}

	const handleCreate = () => {
		setModalType('create');
		setArticalModalVisible(true);
	}

	const handleCheck = (record) => {
		setModalType('check');
		setRecordData(record);
		setArticalModalVisible(true);
	}

	const handleUpdate = (record) => {
		setModalType('update');
		setRecordData(record);
		setArticalModalVisible(true);
	}

	const handleDelete = (record) => {
		Modal.confirm({
			title: '提示',
			content: '确定要删除该篇文章吗？',
			onOk: () => {
				const input = {
					id: record._id
				}
				reqDeleteArtical(input).then(() => {
					getArticalList();
				})
			}
		})
	}

	const handleTableChange = (newPagination) => {
		if (pagination.pageSize !== newPagination.pageSize) {
			newPagination.current = 1;
		};
		setPagination({
			...pagination,
			...newPagination
		});
	}

	useEffect(() => {
		getTagList();
	}, [])

	useEffect(() => {
		getArticalList();
	}, [pagination])

	const columns = [
		{
			title: '序号',
			dataIndex: 'order',
			align: 'center',
			width: '5%',
			render: (...args) => args[2] / 1 + 1
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '所属标签',
			dataIndex: 'tag',
			align: 'center',
			width: '10%',
			render: (text, record) => {
				if (record.category) {
					const { category: { title, color } } = record;
					return <Tag color={color}>{title}</Tag>
				}
			}
		},
		{
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			width: '10%',
			render: text => {
				return getTextByValue(text, articalStatusList);
			}
		},
		{
			title: '发布时间',
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
					<Space size="small">
						<Button type='link' onClick={() => { handleCheck(args[1]) }}>查看</Button>
						<Button type='link' onClick={() => { handleUpdate(args[1]) }}>编辑</Button>
						<Button type='link' onClick={() => { handleDelete(args[1]) }}>删除</Button>
					</Space>
				)
			}
		}
	]

	return (
		<div className="artical-manage">
			<div className='artical-manage-btns' style={{ margin: '20px 0' }}>
				<Space>
					<Button type='primary' onClick={handleCreate} icon={<EditOutlined />}>写文章</Button>
				</Space>
			</div>
			<Table
				rowKey={record => record._id}
				columns={columns}
				dataSource={articalList}
				pagination={{
					...pagination,
					total
				}}
				onChange={handleTableChange}
				loading={loading}
			/>
			{
				articalModalVisible && (
					<ArticalModal
						modalType={modalType}
						articalModalVisible={articalModalVisible}
						setArticalModalVisible={setArticalModalVisible}
						tagList={tagList}
						getArticalList={getArticalList}
						recordData={recordData}
					/>
				)
			}
		</div>
	)
};

export default ArticalManage;