export function ChatUI() {
	const messages = [
		{
			id: '1',
			type: 'user',
			content: 'Hello, how are you?',
		},
		{
			id: '2',
			type: 'assistant',
			content:
				'I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!',
		},
	];
	return (
		<div className="">
			{messages.map((message) => (
				<div key={message.id} className="border-border/50 border-b py-2">
					<div className="text-text-muted">{message.type}</div>
					<div className="py-1 text-text-primary">{message.content}</div>
				</div>
			))}
			<div className="absolute right-0 bottom-8 left-0 mx-[10%] w-[80%] rounded-lg bg-bg-secondary px-4 py-2">
				<div className="flex flex-row items-center gap-2">
					<textarea
						placeholder="Ask me anything..."
						className="h-16 grow py-2 text-sm"
					/>
					<button type="button" className="rounded-full bg-bg-tertiary p-2">
						Mic
					</button>
					<button type="button" className="rounded-full bg-bg-tertiary p-2">
						Send
					</button>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Model
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Attach
					</div>
				</div>
				<div className="mt-2 flex flex-row items-center gap-2">
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Web Search
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Reference
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Thinking
					</div>
				</div>
			</div>
		</div>
	);
}
