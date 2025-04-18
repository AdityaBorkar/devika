import { Plus } from 'lucide-react';
import type React from 'react';

interface HeaderActionsProps {
	onCreateTask?: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
	onCreateTask = () => {},
}) => {
	return (
		<button
			type="button"
			className="flex items-center rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-sm text-white hover:bg-indigo-700"
			onClick={onCreateTask}
		>
			<Plus size={16} className="mr-1" />
			New Task
		</button>
	);
};
