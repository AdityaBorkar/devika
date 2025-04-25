import { atom } from 'jotai';

export const ContextAtom = atom({
	config: {
		name: 'Devika',
		ide: 'cursor',
	},
});

export const WorkspaceAtom = atom((get) => get(ContextAtom).config);
