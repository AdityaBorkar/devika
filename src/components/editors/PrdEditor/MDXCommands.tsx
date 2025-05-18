import { Extension } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import type { Editor } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';

// Define the command item interface
export interface CommandItem {
	id: string;
	label: string;
	description?: string;
	action: (props: { editor: Editor; range: any }) => void;
}

// Define document reference interface
export interface DocumentReference {
	id: string;
	title: string;
}

// Create default commands for editor
export const createDefaultCommands = (): CommandItem[] => [
	{
		id: 'h1',
		label: 'Heading 1',
		description: 'Big section heading',
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 1 })
				.run();
		},
	},
	{
		id: 'h2',
		label: 'Heading 2',
		description: 'Medium section heading',
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 2 })
				.run();
		},
	},
	{
		id: 'h3',
		label: 'Heading 3',
		description: 'Small section heading',
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 3 })
				.run();
		},
	},
	{
		id: 'bullet',
		label: 'Bullet List',
		description: 'Create a bulleted list',
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run();
		},
	},
	{
		id: 'number',
		label: 'Numbered List',
		description: 'Create a numbered list',
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
		},
	},
	{
		id: 'code',
		label: 'Code Block',
		description: 'Insert a code block',
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
		},
	},
];

// Create default document references when none provided
export const defaultDocumentReferences: DocumentReference[] = [
	{ id: 'doc1', title: 'Getting Started' },
	{ id: 'doc2', title: 'API Reference' },
	{ id: 'doc3', title: 'Deployment Guide' },
];

// Helper to create a dropdown popup
const createDropdownPopup = (
	props: any,
	items: any[],
	onSelect: (item: any) => void,
) => {
	const element = document.createElement('div');
	element.className =
		'bg-white shadow-lg rounded-md p-1 border border-zinc-200 absolute z-50';

	items.forEach((item) => {
		const button = document.createElement('button');
		button.className =
			'block w-full text-left px-3 py-2 rounded hover:bg-bg-primary';
		button.innerHTML = item.description
			? `<div>${item.label || item.title}</div><div class="text-xs text-text-muted">${item.description}</div>`
			: item.label || item.title;

		button.addEventListener('click', () => {
			onSelect(item);
		});

		element.appendChild(button);
	});

	// Position the element
	const rect = props.clientRect?.();
	if (rect) {
		element.style.top = `${rect.top + window.scrollY + rect.height}px`;
		element.style.left = `${rect.left + window.scrollX}px`;
	}

	document.body.appendChild(element);

	return {
		element,
		destroy: () => {
			if (document.body.contains(element)) {
				document.body.removeChild(element);
			}
		},
	};
};

// Create slash commands extension
export function createSlashCommandsExtension(commands: CommandItem[]) {
	return Extension.create({
		name: 'slashCommands',
		addOptions() {
			return {
				suggestion: {
					char: '/',
					command: ({
						editor,
						range,
						props,
					}: {
						editor: Editor;
						range: any;
						props: any;
					}) => {
						props.action({ editor, range });
					},
				},
			};
		},
		addProseMirrorPlugins() {
			return [
				Suggestion({
					editor: this.editor,
					...this.options.suggestion,
					items: ({ query }: { query: string }) => {
						return commands
							.filter((item) =>
								item.label.toLowerCase().includes(query.toLowerCase()),
							)
							.slice(0, 5);
					},
					render: () => {
						let popup: { destroy: () => void } | null = null;

						return {
							onStart: (props: any) => {
								popup = createDropdownPopup(props, props.items, (item) => {
									props.command(item);
									popup?.destroy();
								});
							},
							onUpdate: (props: any) => {
								if (popup) {
									popup.destroy();
									popup = createDropdownPopup(props, props.items, (item) => {
										props.command(item);
										popup?.destroy();
									});
								}
							},
							onKeyDown: (props: any) => {
								if (props.event.key === 'Escape') {
									popup?.destroy();
									return true;
								}
								return false;
							},
							onExit: () => {
								popup?.destroy();
							},
						};
					},
				}),
			];
		},
	});
}

// Create document reference extension
export function createDocumentReferenceExtension(
	documentReferences: DocumentReference[],
) {
	return Mention.configure({
		HTMLAttributes: {
			class: 'bg-blue-100 px-1 py-0.5 rounded text-blue-800 font-medium',
		},
		suggestion: {
			char: '@',
			items: ({ query }: { query: string }) => {
				return documentReferences
					.filter((item) =>
						item.title.toLowerCase().includes(query.toLowerCase()),
					)
					.slice(0, 5);
			},
			render: () => {
				let popup: { destroy: () => void } | null = null;

				return {
					onStart: (props: any) => {
						popup = createDropdownPopup(props, props.items, (item) => {
							props.command({ id: item.id, label: item.title });
							popup?.destroy();
						});
					},
					onUpdate: (props: any) => {
						if (popup) {
							popup.destroy();
							popup = createDropdownPopup(props, props.items, (item) => {
								props.command({ id: item.id, label: item.title });
								popup?.destroy();
							});
						}
					},
					onKeyDown: (props: any) => {
						if (props.event.key === 'Escape') {
							popup?.destroy();
							return true;
						}
						return false;
					},
					onExit: () => {
						popup?.destroy();
					},
				};
			},
		},
	});
}
