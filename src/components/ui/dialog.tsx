import { isValidElement, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "@/contexts/DialogContext";
import { cn } from "@/lib/utils";

// Define type for structured dialog content
type StructuredDialogContent = {
	title: string;
	description?: string;
	content?: ReactNode;
};

export function Dialog() {
	const { dialogContent, isOpen, closeDialog } = useDialog();

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Escape to close
			if (e.key === "Escape") closeDialog();

			// Alt+C to open/close connection dialog
			if (e.altKey && e.key === "c") {
				const connectionButton = document.querySelector(
					"[data-connection-btn]",
				);
				if (connectionButton instanceof HTMLElement) {
					connectionButton.click();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		if (isOpen) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen, closeDialog]);

	if (!dialogContent) return null;

	// Check if dialogContent is a React element (component)
	const isComponentContent = isValidElement(dialogContent);

	// Check if dialogContent has structured format
	const isStructuredContent =
		typeof dialogContent === "object" &&
		dialogContent !== null &&
		!isComponentContent &&
		"title" in dialogContent;

	return createPortal(
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200",
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
			)}
			onClick={closeDialog}
		>
			<div
				className={cn(
					"w-full max-w-md rounded-lg bg-bg-primary p-6 shadow-lg transition-all duration-200",
					isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{isComponentContent ? (
					// Render component directly
					dialogContent
				) : isStructuredContent ? (
					// Render structured content
					<>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">
								{(dialogContent as StructuredDialogContent).title}
							</h2>
							<button
								onClick={closeDialog}
								className="text-text-muted hover:text-text-primary rounded-full p-1"
							>
								✕
							</button>
						</div>
						{(dialogContent as StructuredDialogContent).description && (
							<p className="text-text-muted mb-4">
								{(dialogContent as StructuredDialogContent).description}
							</p>
						)}
						{(dialogContent as StructuredDialogContent).content}
					</>
				) : (
					// Fallback for other content
					<>
						<div className="flex justify-between items-center mb-4">
							<div className="grow"></div>
							<button
								onClick={closeDialog}
								className="text-text-muted hover:text-text-primary rounded-full p-1"
							>
								✕
							</button>
						</div>
						{dialogContent as ReactNode}
					</>
				)}
			</div>
		</div>,
		document.body,
	);
}
