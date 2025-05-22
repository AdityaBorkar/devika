import { arktypeResolver } from "@hookform/resolvers/arktype";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { workspaceAtom } from "@/app/(app)/new/store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $fetch } from "@/lib/$fetch";
import { ProjectOnboarding } from "@/schema/ProjectOnboarding";

const IDE_OPTIONS = [
	{ value: "cursor", label: "Cursor" },
	{ value: "cline", label: "Cline" },
	{ value: "github-copilot", label: "GitHub Copilot" },
	{ value: "roo-code", label: "Roo Code" },
	{ value: "windsurf", label: "Windsurf" },
	{ value: "continue", label: "Continue" },
	{ value: "augment", label: "Augment" },
] as const;

export function Step1({ setStep }: { setStep: (step: number) => void }) {
	const [searchParams] = useSearchParams();

	const [workspace, setWorkspace] = useAtom(workspaceAtom);
	const defaultValues = {
		name: searchParams.get("name") ?? undefined,
		tdd: searchParams.get("tdd") === "true",
		// ide: (searchParams.get("ide") ?? "").split(",").filter(Boolean) as ProjectOnboarding["ide"],
	};

	const form = useForm<ProjectOnboarding>({
		mode: "onChange",
		resolver: arktypeResolver(ProjectOnboarding),
		defaultValues: workspace || defaultValues,
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = form;

	const selectedIdes = watch("ide") || [];

	const toggleIde = (value: ProjectOnboarding["ide"][number]) => {
		const currentValues = [...selectedIdes];
		const index = currentValues.indexOf(value);

		if (index === -1) {
			// Add the value if it doesn't exist
			setValue("ide", [...currentValues, value]);
		} else {
			// Remove the value if it exists
			currentValues.splice(index, 1);
			setValue("ide", currentValues);
		}
	};

	async function onSubmit(inputs: ProjectOnboarding) {
		const { success, data } = await $fetch(
			"POST",
			"/api/actions/workspace",
			inputs,
		);
		if (!success) return console.error("Failed to create workspace");

		const { createdAt, ...workspace } = data;
		setWorkspace(workspace);
		setStep(2);
	}

	return (
		<form className="px-8 py-4" onSubmit={handleSubmit(onSubmit)}>
			<h1 className="mb-6 font-semibold text-2xl text-card-foreground">
				Workspace Onboarding
			</h1>

			<div className="space-y-8">
				<div className="space-y-2">
					<Label htmlFor="name">Workspace Name</Label>
					{/* TODO: Check AVAILABILITY */}
					{/* TODO: GitHub Repo Name Validation */}
					<Input
						id="name"
						placeholder="My Awesome Project"
						{...register("name")}
					/>
					{errors.name && (
						<p className="text-destructive text-sm">{errors.name.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label>Choose AI Editor(s)</Label>
					<div className="grid grid-cols-2 gap-2">
						{IDE_OPTIONS.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<Checkbox
									id={`ide-${option.value}`}
									checked={selectedIdes.includes(option.value)}
									onCheckedChange={() => toggleIde(option.value)}
								/>
								<Label
									htmlFor={`ide-${option.value}`}
									className="cursor-pointer"
								>
									{option.label}
								</Label>
							</div>
						))}
					</div>
					{errors.ide && (
						<p className="text-destructive text-sm">{errors.ide.message}</p>
					)}
				</div>

				<div className="flex items-center gap-2">
					<Checkbox id="tdd" {...register("tdd")} />
					<Label htmlFor="tdd">Enable Test-Driven Development</Label>
					{errors.tdd && (
						<p className="text-destructive text-sm">{errors.tdd.message}</p>
					)}
				</div>

				<Button className="mt-6 w-full" type="submit">
					Next
				</Button>
			</div>
		</form>
	);
}
