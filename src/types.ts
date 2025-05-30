export interface Task {
  id: string;
  title: string;
  description: string;
  created: string;
  status: TaskStatus;
}

export type TaskStatus = 'backlog' | 'ready' | 'inProgress' | 'finished';

export const List_Types: Record<string, TaskStatus> = {
	Backlog: 'backlog',
	Ready: 'ready',
	InProgress: 'inProgress',
	Finished: 'finished',
};

export const List_Types_Show: Record<TaskStatus, string> = {
	[List_Types.Backlog]: 'Backlog',
	[List_Types.Ready]: 'Ready',
	[List_Types.InProgress]: 'In progress',
	[List_Types.Finished]: 'Finished',
};

export interface TaskListProps {
  type: TaskStatus;
  title: string;
  tasks: Task[];
  addNewTask: (title: string, description: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  previousTasks: Task[];
}

export interface FormProps {
  formSubmit: (title: string, description: string) => void;
}

export interface DropdownProps {
  tasks: Task[];
  onTaskSelect: (taskId: string) => void;
}

export interface CardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export interface TaskDetailProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export interface FooterProps {
  tasks: Task[];
}