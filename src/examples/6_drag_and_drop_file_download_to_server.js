import { useState } from 'react';
import './App.css';

function App() {
	// is file dragged to browser
	const [drag, setDrag] = useState(false)

	function dragStartHandler(e) {
		e.preventDefault();
		setDrag(true)
	}

	function dragLeaveHandler(e) {
		e.preventDefault()
		setDrag(false)
	}

	function dropHandler(e) {
		e.preventDefault()
		let files = [...e.dataTransfer.files]
		const formData = new FormData()
		formData.append('file', files[0])
		formData.append('userId', 1)
		//axios.post('url', formData, options)

		setDrag(false)
	}

	return (
		<div className="app">
			{drag
				? <div 
					className='drop-area'
					onDragStart = {e => dragStartHandler(e)}
					onDragLeave = {e => dragLeaveHandler(e)}
					onDragOver = {e => dragStartHandler(e)}
					onDrop = {e => dropHandler(e)}
				>Leave file for downloading it</div>
				: <div
					onDragStart = {e => dragStartHandler(e)}
					onDragLeave = {e => dragLeaveHandler(e)}
					onDragOver = {e => dragStartHandler(e)}
				>Move files to download them</div>
			}
		</div>
	);
}

export default App;
