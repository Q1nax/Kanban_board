import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormProps, DropdownProps } from '../types';

interface FormValues {
	title: string;
	description: string;
}

export const Form: React.FC<FormProps> = ({ formSubmit }) => {
	const [values, setValues] = useState<FormValues>({
		title: '',
		description: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const fieldName = e.target.name;
		setValues({...values, [fieldName]: e.target.value});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (values.title) {
			formSubmit(values.title, values.description);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form">
			<input 
				className="input" 
				id='taskTitle' 
				name='title' 
				type='text' 
				placeholder='Enter task title' 
				onChange={handleChange} 
				value={values.title} 
			/>
			<textarea 
				className="textarea" 
				id='taskDescription' 
				name='description' 
				placeholder='Enter task description' 
				value={values.description} 
				onChange={handleChange} 
			/>
			<button className="submit" type='submit'>Submit</button>
		</form>
	);
};

export const Dropdown: React.FC<DropdownProps> = ({ tasks, onTaskSelect }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      onTaskSelect(e.target.value);
    }
  };

  return (
    <div className="dropdown">
      <select 
        className="dropdown-select" 
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>Select a task</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
    </div>
  );
};