'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateCycleDialogProps {
	onCycleCreate: (data: {
		name: string;
		description: string;
		startDate: string;
		endDate: string;
	}) => void;
}

export function CreateCycleDialog({ onCycleCreate }: CreateCycleDialogProps) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		startDate: '',
		endDate: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onCycleCreate(formData);
		setFormData({
			name: '',
			description: '',
			startDate: '',
			endDate: '',
		});
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className="mr-2 h-4 w-4" />
					Create Cycle
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create New Cycle</DialogTitle>
						<DialogDescription>
							Create a new development cycle to organize your tasks.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="startDate" className="text-right">
								Start Date
							</Label>
							<Input
								id="startDate"
								name="startDate"
								type="date"
								value={formData.startDate}
								onChange={handleChange}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="endDate" className="text-right">
								End Date
							</Label>
							<Input
								id="endDate"
								name="endDate"
								type="date"
								value={formData.endDate}
								onChange={handleChange}
								className="col-span-3"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
