import React, { useRef } from 'react';
import './index.less'

const FileUploader = (props) => {
	const { width, height } = props;

	const fileInput = useRef();

	const uploaderStyle = {
		width: (!width || width <= 70 ? 70 : width) + 'px',
		height: (!height || height <= 32 ? 32 : height) + 'px'
	}

	const handleSelectFile = () => {
		fileInput.current.click();
	}

	const handleFileChange = (e) => {
		console.log(e.target.files);
	}

	return (
		<div className='file-uploader' style={{ ...uploaderStyle }} onClick={handleSelectFile}>
			<div className='file-uploader-text'>{props.children || '上传'}</div>
			<input className='file-uploader-trigger' ref={fileInput} type='file' accept='image/jpeg' onChange={handleFileChange} />
		</div>
	)
}

export default FileUploader;