import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useServerSync } from '@/lib/server-sync/ServerSync';
import { ProjectOnboarding } from '@/schema/ProjectOnboarding';

export default function ProjectOnboarding_BasicInfo() {
	const { socket } = useServerSync();
	const form = useForm<ProjectOnboarding>({
		mode: 'onChange',
		resolver: arktypeResolver(ProjectOnboarding),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = form;

	function onSubmit(data: ProjectOnboarding) {
		const params = { command: 'ONBOARDING', data };
		socket.send(JSON.stringify(params));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className="mb-6 font-semibold text-2xl text-card-foreground">
				Project Onboarding
			</h1>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Project Name</Label>
					<Input
						id="name"
						placeholder="My Awesome Project"
						{...register('name')}
					/>
					{errors.name && (
						<p className="text-destructive text-sm">{errors.name.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="ide">Choose AI Editor</Label>
					<Select
						onValueChange={(value: ProjectOnboarding['ide']) => {
							setValue('ide', value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select AI Editor" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cursor">Cursor</SelectItem>
							<SelectItem value="cline">Cline</SelectItem>
							<SelectItem value="github-copilot">GitHub Copilot</SelectItem>
							<SelectItem value="roo-code">Roo Code</SelectItem>
							<SelectItem value="windsurf">Windsurf</SelectItem>
							<SelectItem value="continue">Continue</SelectItem>
						</SelectContent>
					</Select>
					{errors.ide && (
						<p className="text-destructive text-sm">{errors.ide.message}</p>
					)}
				</div>

				<Button className="mt-6 w-full" type="submit">
					Next
				</Button>
			</div>
		</form>
	);
}
