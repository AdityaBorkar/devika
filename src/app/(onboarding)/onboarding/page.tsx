import ProjectOnboarding_BasicInfo from '@/app/(onboarding)/onboarding/_steps/BasicInfo';
import ProjectOnboarding_ProjectStructure from '@/app/(onboarding)/onboarding/_steps/ProjectStructure';

export default function OnboardingPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-sm">
				<ProjectOnboarding_BasicInfo />
				{/* <ProjectOnboarding_ProjectStructure /> */}
			</div>
		</div>
	);
}
