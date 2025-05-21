import { createContext, useContext, useState } from "react";

interface DialogContextType {
	openDialog: (content: React.ReactNode) => void;
	closeDialog: () => void;
	isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = (content: React.ReactNode) => {
		console.log("openDialog", content);
		setDialogContent(content);
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
		setTimeout(() => setDialogContent(null), 200); // Clear content after animation
	};

	return (
		<DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
			{children}
			{isOpen && (
				<div className="h-screen w-screen top-0 left-0 fixed flex items-center justify-center bg-background/70">
					{dialogContent}
				</div>
			)}
		</DialogContext.Provider>
	);
}

export function useDialog() {
	const context = useContext(DialogContext);
	if (!context)
		throw new Error("useDialog must be used within a DialogProvider");
	return context;
}
