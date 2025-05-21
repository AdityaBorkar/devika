import { arktypeResolver } from "@hookform/resolvers/arktype";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useServerSync } from "@/lib/server-sync/ServerSync";
import { cn } from "@/lib/utils";
import { ProjectOnboarding } from "@/schema/ProjectOnboarding";

export function Step2({
	setStep: setCurrentStep,
}: {
	setStep: (step: number) => void;
}) {
	const { socket } = useServerSync();
	const form = useForm<ProjectOnboarding>({
		mode: "onChange",
		resolver: arktypeResolver(ProjectOnboarding),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = form;

	function onSubmit(data: ProjectOnboarding) {
		const params = { command: "ONBOARDING", data };
		socket.send(JSON.stringify(params));
		setCurrentStep(3);
	}

	const [isConnected, setIsConnected] = useState(false);
	const [workspacePath, setWorkspacePath] = useState("/devika/hello-world");
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
							npx devika connect TOKEN-EXPIRES-IN-TWO-MINS
						</div>
						<div className="px-2 py-1 bg-bg-tertiary text-text-tertiary rounded-md">
							Copy
						</div>
					</div>
					<div className="pt-2 px-2">
						<div
							className={cn(
								"size-4 mr-2  rounded-full inline-block -mb-0.5 ",
								isConnected && "bg-green-500",
								!isConnected && "bg-amber-500 animate-pulse",
							)}
						/>
						{isConnected
							? `Connected to ${workspacePath}`
							: "Waiting for connection..."}
					</div>
				</div>
				{/* <Button className="">Connect to GitHub Repository</Button> */}
			</div>

			<Button className="mt-6 w-full" type="submit" disabled={!isConnected}>
				Next
			</Button>
		</form>
	);
}
