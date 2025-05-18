import { useState } from 'react';
import { Step1 } from '@/app/(onboarding)/onboarding/components/Step1';
import { Step2 } from '@/app/(onboarding)/onboarding/components/Step2';
import { Step3 } from '@/app/(onboarding)/onboarding/components/Step3';

export default function OnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1);
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg rounded-lg border border-border bg-bg-primary shadow-sm">
				{currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
				{currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
				{currentStep === 3 && <Step3 setCurrentStep={setCurrentStep} />}
			</div>
		</div>
	);
}
