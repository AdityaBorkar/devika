import { Button } from '@/components/ui/button';

export function Step3({
	setCurrentStep,
}: {
	setCurrentStep: (step: number) => void;
}) {
	return (
		<div>
			<div>Connect Jira / Atlassian / Slack</div>
			<div>
				<Button onClick={() => setCurrentStep(4)}>Next</Button>
			</div>
		</div>
	);
}
