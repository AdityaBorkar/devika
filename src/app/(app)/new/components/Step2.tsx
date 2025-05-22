import { arktypeResolver } from "@hookform/resolvers/arktype";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { workspaceAtom } from "@/app/(app)/new/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useClientSync } from "@/lib/server-sync/ServerSync";
import { cn } from "@/lib/utils";
import { ProjectOnboarding } from "@/schema/ProjectOnboarding";

export function Step2({
	setStep: setCurrentStep,
}: {
	setStep: (step: number) => void;
}) {
	const form = useForm<ProjectOnboarding>({
		mode: "onChange",
		resolver: arktypeResolver(ProjectOnboarding),
	});
	const { handleSubmit } = form;

	const workspace = useAtomValue(workspaceAtom);
	const { socket } = useClientSync();
	function onSubmit(data: ProjectOnboarding) {
		const params = { command: "ONBOARDING", data: workspace };
		socket.send(JSON.stringify(params));
		setCurrentStep(3);
	}

	const [workspacePath, setWorkspacePath] = useState<string | undefined>(
		undefined,
	);
	return (
		<form className="px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="text-lg font-medium mb-6">
				Connect to a Local Workspace
			</div>
			<div className="flex flex-col gap-2">
				<div>
					<Label>Connect to Local Workspace (Empty Works)</Label>
					<div className="mt-2 flex justify-between border border-border rounded-md p-1">
						<div className="py-1 font-mono text-text-secondary px-2">
							bunx devika connect EXPIRES-IN-TWO-MINS
						</div>
						<div className="px-2 py-1 bg-bg-tertiary text-text-tertiary rounded-md">
							Copy
						</div>
					</div>
					<div className="pt-2 px-2">
						<div
							className={cn(
								"size-4 mr-2  rounded-full inline-block -mb-0.5 ",
								workspacePath && "bg-green-500",
								!workspacePath && "bg-amber-500 animate-pulse",
							)}
						/>
						{workspacePath
							? `Connected to ${workspacePath}`
							: "Waiting for connection..."}
					</div>
				</div>
				{/* <Button className="">Connect to GitHub Repository</Button> */}
			</div>

			<Button className="mt-6 w-full" type="submit" disabled={!workspacePath}>
				Next
			</Button>
			<Button className="mt-6 w-full" type="submit">
				I will connect later
			</Button>
		</form>
	);
}
