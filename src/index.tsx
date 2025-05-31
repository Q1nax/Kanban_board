import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Header, Footer } from "./components/Layout";
import KanbanRoutes from "./components/KanbanRoutes";
import { HashRouter } from 'react-router-dom';
import { Task } from './types';

function App(): JSX.Element {
    const migrateData = (tasks: Task[]): Task[] => {
        return tasks.map(task => {
            if ((task.status as string) === 'done') {
                return {...task, status: 'finished'};
            }
            return task;
        });
    };

    let storedTasks: Task[] = [];
    try {
        const parsed = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        if (Array.isArray(parsed)) {
            storedTasks = parsed;
        } else {
            console.warn('Invalid tasks data type in localStorage:', typeof parsed, parsed);
            window.localStorage.removeItem('tasks');
            storedTasks = [];
        }
    } catch (error) {
        console.warn('Failed to parse tasks from localStorage:', error);
        window.localStorage.removeItem('tasks');
        storedTasks = [];
    }
    const migratedTasks = migrateData(storedTasks);
    const [tasks, setTasks] = useState<Task[]>(migratedTasks);
  
    useEffect(() => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    return (
        <HashRouter>
            <div className="app">
                <Header />
                <KanbanRoutes tasks={tasks} setTasks={setTasks} />
                <Footer tasks={tasks} />
            </div>
        </HashRouter>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}