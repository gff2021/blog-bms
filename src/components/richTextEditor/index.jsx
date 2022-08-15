import { useState } from 'react';
import { Row, Select, Form, Tag } from 'antd';
import EmojiPicker from '../emojiPicker';
import FileUploader from '../fileUploader';
import { Editor, RichUtils } from 'draft-js';
import { styleMap, blockTypeList, inlineTypeList, fontSizeList, fontColorList } from './constant';
import 'draft-js/dist/Draft.css';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const RichTextEditor = (props) => {
	const { editorState, setEditorState, isReadOnly } = props;

	const [focusBlockType, setFocusBlockType] = useState(null);

	const [form] = Form.useForm();

	const handleEditorStateChange = (editorState) => {
		const selectionState = editorState.getSelection();
		const focusKey = selectionState.getFocusKey();
		const focusBlockType = editorState.getCurrentContent().getBlockForKey(focusKey).getType(); // 获取焦点所在行的blockType
		setFocusBlockType(focusBlockType);
		setEditorState(editorState);
	}

	const handleKeyCommand = (command, editorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	const handleBlockTypeChange = (e, style) => {
		if (e) {
			e.preventDefault();
		};
		setFocusBlockType(style);
		setEditorState(RichUtils.toggleBlockType(editorState, style));
	}

	const handleInlineTypeChange = (e, style) => {
		if (e) {
			e.preventDefault();
		}
		setEditorState(RichUtils.toggleInlineStyle(editorState, style));
	}

	return (
		<div className='editor-container'>
			<div className='editor-header'>
				<Form form={form}>
					<Row justify='space-between' style={{ marginBottom: '20px' }}>
						{
							blockTypeList && blockTypeList.map(item => {
								return (
									<button
										key={item.style}
										className={item.style === focusBlockType ? 'active' : null}
										onMouseDown={(e) => { handleBlockTypeChange(e, item.style) }}
									>{item.label}</button>
								)
							})
						}
						{
							inlineTypeList && inlineTypeList.map(item => {
								return (
									<button
										key={item.style}
										style={styleMap[item.style]}
										onMouseDown={(e) => { handleInlineTypeChange(e, item.style) }}
									>{item.label}</button>
								)
							})
						}
					</Row>
					<Row justify='start'>
						<FormItem name='fontSize'>
							<Select placeholder='字号' style={{ width: '120px' }}>
								{
									fontSizeList && fontSizeList.map(item => {
										return (
											<Option
												key={item.style}
												value={item.style}
												onMouseDown={(e) => { handleInlineTypeChange(e, item.style) }}
											>{item.label}</Option>
										)
									})
								}
							</Select>
						</FormItem>
						<FormItem name='fontColor'>
							<Select placeholder='字体颜色' style={{ width: '120px' }}>
								{
									fontColorList && fontColorList.map(item => {
										return (
											<Option
												key={item.style}
												onMouseDown={(e) => { handleInlineTypeChange(e, item.style) }}
												style={{ color: item.color }}
											>
												<Tag color={item.color} style={{ width: '100%', height: '100%' }}></Tag>
											</Option>
										)
									})
								}
							</Select>
						</FormItem>
						<FormItem name='emoji'>
							<EmojiPicker />
						</FormItem>
						<FormItem name='image'>
							<FileUploader>Image</FileUploader>
						</FormItem>
					</Row>
				</Form>
			</div>
			<div className='editor-content'>
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					onChange={handleEditorStateChange}
					customStyleMap={styleMap}
					readOnly={isReadOnly}
					textAlignment='left'
					placeholder='请输入内容...'
				/>
			</div>
		</div>
	)
}

export default RichTextEditor;