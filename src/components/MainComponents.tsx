import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import { Form, Dropdown } from './UIElements';
import { List_Types, List_Types_Show, TaskListProps, CardProps, Task, TaskStatus } from '../types';

export const List: React.FC<TaskListProps> = ({ type, title, tasks, addNewTask, moveTask, previousTasks }) => {
	const [isFormVisible, setFormVisible] = useState<boolean>(false);
	const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    
    const handleAddNewClick = () => {
		if (type === List_Types.Backlog) {
			setFormVisible(!isFormVisible);
		} else {
			if (previousTasks && previousTasks.length > 0) {
				setDropdownVisible(!isDropdownVisible);
			}
		}
	};

	const formSubmit = (title: string, description: string) => {
		addNewTask(title, description);
		setFormVisible(false);
	};

	const handleTaskSelect = (taskId: string) => {
		moveTask(taskId, type);
		setDropdownVisible(false);
	};

	const isButtonDisabled = type !== List_Types.Backlog && (!previousTasks || previousTasks.length === 0);

    return (
        <div className="task_card">
           <h2 className="task_name">{title}</h2>
           <div className="tasks_container">
				{tasks.length ? 
					tasks.map(task =>
						<Link key={task.id} to={`/tasks/${task.id}`}>
							<div className="task">{task.title}</div>
						</Link>
					) : 
					<p className="no_tasks">No tasks added yet</p>
				}
			</div>
			<div className="task_card_footer">
				<button 
					onClick={handleAddNewClick} 
					className={`addButton ${isButtonDisabled ? 'disabled' : ''}`}
					disabled={isButtonDisabled}
				>
					+ Add card
				</button>
				{isFormVisible && (
					<Form formSubmit={formSubmit} />
				)}
				{isDropdownVisible && (
					<Dropdown 
						tasks={previousTasks} 
						onTaskSelect={handleTaskSelect}
					/>
				)}
			</div>
        </div>
    );
};

export const Card: React.FC<CardProps> = ({ tasks, setTasks }) => {
    
    const addNewTask = (title: string, description: string) => {
		const task: Task = {
			id: uniqid(),
			title,
			description,
			created: new Date().toISOString(),
			status: List_Types.Backlog,
		};

		setTasks([...tasks, task]);
	};

	const moveTask = (taskId: string, newStatus: TaskStatus) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return {...task, status: newStatus};
			}
			return task;
		});
		setTasks(updatedTasks);
	};

	const getPreviousTasks = (currentType: TaskStatus): Task[] => {
		switch(currentType) {
			case List_Types.Ready:
				return tasks.filter(task => task.status === List_Types.Backlog);
			case List_Types.InProgress:
				return tasks.filter(task => task.status === List_Types.Ready);
			case List_Types.Finished:
				return tasks.filter(task => task.status === List_Types.InProgress);
			default:
				return [];
		}
	};

	return (
        <div className="cards_background">
			<div className="card_wrapper">
				{Object.values(List_Types).map(type => {
					const listTasks = tasks.filter(task => task.status === type);
					const previousTasks = getPreviousTasks(type);
					
					return (
						<List
							key={List_Types_Show[type]}
							type={type}
							title={List_Types_Show[type]}
							tasks={listTasks || []}
							addNewTask={addNewTask}
							moveTask={moveTask}
							previousTasks={previousTasks}
						/>
					);
				})}
			</div>
        </div>
	);
};