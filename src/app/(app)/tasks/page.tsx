import { ViewLayout, type ViewTab } from '@/components/layouts/ViewLayout';
import { TaskCardItem } from '@/components/tasks/TaskCardItem';
import { TaskListItem } from '@/components/tasks/TaskListItem';

export default function TaskViewPage() {
	// TODO: Properties

	const viewTabs = [
		{ label: 'All Tasks', value: 'all', display: 'kanban' },
		{ label: 'Un-assigned', value: 'all', display: 'list' },
		{ label: 'Assigned', value: 'active', display: 'kanban' },
		{ label: 'Backlog', value: 'backlog', display: 'kanban' },
	] as ViewTab[];

	const saveViewTab = (tab: ViewTab) => {
		// ...
	};

	return (
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
	);
}
