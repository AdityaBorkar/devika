import { motion } from 'motion/react';
import { ViewLayout, type ViewTab } from '@/components/layouts/ViewLayout';
import { TaskCardItem } from '@/components/tasks/TaskCardItem';
import { TaskListItem } from '@/components/tasks/TaskListItem';

export default function TaskViewPage() {
	// TODO: Properties

	const viewTabs = [
		{ label: 'All Tasks', value: 'all', display: 'kanban' },
		{ label: 'Un-assigned', value: 'unassigned', display: 'list' },
		{ label: 'Assigned', value: 'assigned', display: 'kanban' },
		{ label: 'Backlog', value: 'backlog', display: 'kanban' },
	] as ViewTab[];

	const saveViewTab = (_tab: ViewTab) => {
		// ...
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
		>
			<ViewLayout
				wrapperClass="*:px-16"
				viewTabs={viewTabs}
				defaultViewTab="active"
				saveViewTab={saveViewTab}
				components={{
					card: TaskCardItem,
					list: TaskListItem,
				}}
			/>
		</motion.div>
	);
}
