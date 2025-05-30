import React from "react";
import { Card } from "./MainComponents";
import TaskDetail from "./TaskDetail";
import { Routes, Route } from "react-router-dom";
import { CardProps } from '../types';

const KanbanRoutes: React.FC<CardProps> = (props) => {
	return (
		<main className="kanban-routes">
			<Routes>
				<Route path={'/'} element={<Card {...props} />} />
				<Route path={'/tasks/:taskId'} element={<TaskDetail {...props} />} />
			</Routes>
		</main>
	);
};

export default KanbanRoutes;