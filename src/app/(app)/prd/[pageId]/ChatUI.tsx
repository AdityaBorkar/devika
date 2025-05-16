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
					<div className="text-zinc-500">{message.type}</div>
					<div className="py-1 text-zinc-100">{message.content}</div>
				</div>
			))}
			<div className="absolute right-0 bottom-8 left-0 mx-[10%] w-[80%] rounded-lg bg-zinc-800 px-4 py-2">
				<div className="flex flex-row items-center gap-2">
					<textarea
						placeholder="Ask me anything..."
						className="h-16 grow py-2 text-sm"
					/>
					<button type="button" className="rounded-full bg-zinc-700 p-2">
						Mic
					</button>
					<button type="button" className="rounded-full bg-zinc-700 p-2">
						Send
					</button>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div className="rounded-full bg-zinc-700/50 px-4 py-1 text-zinc-500">
						Model
					</div>
					<div className="rounded-full bg-zinc-700/50 px-4 py-1 text-zinc-500">
						Attach
					</div>
				</div>
				<div className="mt-2 flex flex-row items-center gap-2">
					<div className="rounded-full bg-zinc-700/50 px-4 py-1 text-zinc-500">
						Web Search
					</div>
					<div className="rounded-full bg-zinc-700/50 px-4 py-1 text-zinc-500">
						Reference
					</div>
					<div className="rounded-full bg-zinc-700/50 px-4 py-1 text-zinc-500">
						Thinking
					</div>
				</div>
			</div>
		</div>
	);
}
