import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as Close } from "../images/Close.svg";
import { TaskDetailProps } from '../types';

interface TaskParams extends Record<string, string | undefined> {
	taskId: string;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks, setTasks }) => {
	const { taskId } = useParams<TaskParams>();
	const task = tasks.find(task => task.id === taskId);
  
	const [description, setDescription] = useState<string>(
		task ? (task.description ? task.description : "This task has no description") : ""
	);
  
	const addDescription = () => {
		if (!task) return;
		
		const tasksCopy = tasks.map(el => {
			if (el.id === task.id) {
				return { ...el, description };
			}
			return el;
		});
		setTasks(tasksCopy);
	};
  
	return (
		<div className="details_wrapper">
			<div className="details_content">
				{task ? (
					<>
						<div className="details_header">
							<h2 className="details_title">{task.title}</h2>
							<Link to='/'>
								<Close className="close_btn" />
							</Link>
						</div>
						<textarea
							className="details_description"
							onChange={(e) => { setDescription(e.target.value); }}
							onFocus={() => { 
								if (description === "This task has no description") {
									setDescription('');
								}
							}}
							onBlur={addDescription}
							value={description} 
						/>
					</>
				) : (
					<div className="details_not_found">
						<h2 className="details_title">Task with ID {taskId} not found</h2>
						<Link to='/'>
							<Close className="close_btn" />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskDetail;