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

export function Step1({
	setCurrentStep,
}: {
	setCurrentStep: (step: number) => void;
}) {
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

	// Start Creating a Project once NEXT STEP IS CLICKED
	// add a fake 1 second delay

	return (
		<form className="relative px-8 py-4" onSubmit={handleSubmit(onSubmit)}>
			<h1 className="mb-6 font-semibold text-2xl text-card-foreground">
				Workspace Onboarding
			</h1>

			<div className="absolute top-2 right-2 w-fit rounded-md border border-border px-2 py-1">
				Watch 5 min. Tutorial
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Workspace Name</Label>
					<Input
						id="name"
						placeholder="My Awesome Project"
						{...register('name')}
					/>
					{errors.name && (
						<p className="text-destructive text-sm">{errors.name.message}</p>
					)}
				</div>
				{/* <div>Project Type - Web Development Project (To Be Automated)</div> */}
				{/* <div>PRD Name and Target Version</div> */}
				{/* Development Strategy - Test Driven Development */}

				<div className="space-y-2">
					<Label htmlFor="ide">Version Strategy: (Read More)</Label>
					<Select
						onValueChange={(value: ProjectOnboarding['ide']) => {
							setValue('ide', value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select AI Editor" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cursor">Devika-Versioning</SelectItem>
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

				<div>Connect to Local Repository</div>
				<div>Connect to GitHub Repository</div>
				<div>Open Router Models in Chat</div>

				<Button className="mt-6 w-full" type="submit">
					Next
				</Button>
			</div>
		</form>
	);
}
