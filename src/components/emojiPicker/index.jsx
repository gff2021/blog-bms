import React, { useEffect, useState } from 'react';
import { emojiTabList, emojiTabPaneMap } from './constant';
import './index.less'

const EmojiPicker = (props) => {
	const { width, height } = props;

	const [containerVisible, setContainerVisible] = useState(false);
	const [currentEmojiTab, setCurrentEmojiTab] = useState('emoji1');

	const triggerStyle = {
		lineHeight: height || '32px',
		textAlign: 'center'
	}

	const handleClickTrigger = (e) => {
		if (e) {
			e.preventDefault();
		}
		setContainerVisible(!containerVisible);
	}

	const handleChangeTab = (id) => {
		setCurrentEmojiTab(id);
	}

	const handlePickEmoji = (emoji) => {
		console.log(emoji.text);
	}

	useEffect(() => {
		console.log('width', width);
		console.log('height', height);
	}, [])

	return (
		<div className='emoji-picker' style={{ width: width || '32px', height: height || '32px' }}>
			<div
				className='emoji-picker-trigger'
				style={containerVisible ? { ...triggerStyle, border: '1px solid aqua' } : { ...triggerStyle }}
				onClick={handleClickTrigger}
			>
				🧡
			</div>
			<div className='emoji-picker-container' style={{ display: containerVisible ? 'block' : 'none' }}>
				<div className='emoji-picker-container-tabpane'>
					{
						emojiTabPaneMap && emojiTabPaneMap[currentEmojiTab] && emojiTabPaneMap[currentEmojiTab].map(item => {
							return <span key={item.id} onClick={() => { handlePickEmoji(item) }}>{item.text}</span>
						})
					}
				</div>
				<div className='emoji-picker-container-tab'>
					{
						emojiTabList && emojiTabList.map(item => {
							return <span key={item.id} onClick={() => { handleChangeTab(item.id) }}>{item.text}</span>
						})
					}
				</div>
			</div>
		</div>
	)
}

export default EmojiPicker;