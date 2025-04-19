'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProjectOnboardingSchema } from '@/schemas/ProjectOnboarding';

// Default values matching the schema defaults
const defaultValues: Partial<ProjectOnboardingSchema> = {
	aiEditor: 'cursor',
	authorName: '',
	description: '',
	isBlank: 'not_blank',
	isMonorepo: 'no',
	projectName: '',
	projectType: 'project',
	theme: 'light',
	themeColor: '#000000',
};

export default function OnboardingPage() {
	const form = useForm<ProjectOnboardingSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(ProjectOnboardingSchema), // Or "onSubmit"
	});

	function onSubmit(data: ProjectOnboardingSchema) {
		// TODO: Add submit logic
		console.log('Form submitted with data:', data);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Form {...form}>
				<form
					className="w-full max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-sm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<h1 className="font-semibold text-2xl text-card-foreground">
						Project Onboarding
					</h1>

					<FormField
						control={form.control}
						name="projectName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Name</FormLabel>
								<FormControl>
									<Input placeholder="My Awesome Project" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Describe your project..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="themeColor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Theme Color</FormLabel>
									<FormControl>
										<Input className="h-10 w-full" type="color" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Theme</FormLabel>
									<FormControl>
										<RadioGroup
											className="flex items-center space-x-4 pt-2"
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="light" value="light" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="light">
													Light
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="dark" value="dark" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="dark">
													Dark
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="authorName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Author Name</FormLabel>
								<FormControl>
									<Input placeholder="Ada Lovelace" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="isMonorepo"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Monorepo?</FormLabel>
									<FormControl>
										<RadioGroup
											className="flex items-center space-x-4 pt-2"
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="mono-yes" value="yes" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="mono-yes">
													Yes
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="mono-no" value="no" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="mono-no">
													No
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="projectType"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Type</FormLabel>
									<FormControl>
										<RadioGroup
											className="flex items-center space-x-4 pt-2"
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="type-lib" value="library" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="type-lib">
													Library
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem id="type-proj" value="project" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="type-proj">
													Project
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="aiEditor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Choose AI Editor</FormLabel>
								<Select
									defaultValue={field.value}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select AI Editor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="windsurf">Windsurf</SelectItem>
										<SelectItem value="cursor">Cursor</SelectItem>
										<SelectItem value="github_copilot">
											GitHub Copilot
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isBlank"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Start with</FormLabel>
								<FormControl>
									<RadioGroup
										className="flex items-center space-x-4 pt-2"
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<RadioGroupItem id="start-blank" value="blank" />
											</FormControl>
											<FormLabel className="font-normal" htmlFor="start-blank">
												Blank Project
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<RadioGroupItem
													id="start-not-blank"
													value="not_blank"
												/>
											</FormControl>
											<FormLabel
												className="font-normal"
												htmlFor="start-not-blank"
											>
												Template
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className="w-full" type="submit">
						Complete Onboarding
					</Button>
				</form>
			</Form>
		</div>
	);
}
