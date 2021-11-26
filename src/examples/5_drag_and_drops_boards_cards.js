import { useState } from 'react';
import './App.css';

function App() {
	const [boards, setBoards] = useState([
		{id: 1, title: 'Done', items:[{id: 1, title: 'Shopping grocery'}, {id: 2, title: 'Garbage'}, {id: 3, title: 'Cook dinner'}]},
		{id: 2, title: 'Check', items:[{id: 4, title: 'Code review'}, {id: 5, title: 'Task Fibonachi'}, {id: 6, title: 'Task Factorial'}]},
		{id: 3, title: 'ToDo', items:[{id: 7, title: 'Make homeworks with kids'}, {id: 8, title: 'Read book before sleep'}, {id: 9, title: 'Play family game'}]}
	])
	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentItem, setCurrentItem] = useState(null)

	function dragStartHandler(e, board, item) {
		setCurrentBoard(board)
		setCurrentItem(item)
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dragOverHandler(e) {
		e.preventDefault();
		if (e.target.className == 'item') {
			e.target.style.boxShadow = '0 4px 3px gray';
		}
	}

	function dropHandler(e, board, item) {
		e.preventDefault()
		const currentIndex = currentBoard.items.indexOf(currentItem)
		currentBoard.items.splice(currentIndex, 1)
		const dropIndex = board.items.indexOf(item)
		board.items.splice(dropIndex + 1, 0, currentItem)
		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board
			}
			if (b.id === currentBoard.id) {
				return currentBoard
			}
			return b
		}))
	}

	function dropBoardHandler(e, board) {
		board.items.push(currentItem)
		const currentIndex = currentBoard.items.indexOf(currentItem)
		currentBoard.items.splice(currentIndex, 1)
		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board
			}
			if (b.id === currentBoard.id) {
				return currentBoard
			}
			return b
		}))
	}

	return (
		<div className="app">
			{boards.map(board => 
				<div 
					className="board"
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => dropBoardHandler(e, board)}
				>
					<div className="board__title">{board.title}</div>
					{board.items.map(item => 
						<div
							onDragStart={(e) => dragStartHandler(e, board, item)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDragEnd={(e) => dragEndHandler(e)}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dropHandler(e, board, item)}
							draggable={true}
							className="item"
						>
							{item.title}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
