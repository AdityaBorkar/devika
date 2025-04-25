import { atom } from 'jotai';

export const PrdScreenStateAtom = atom({
	tab: 'files',
	files: {
		pageId: '',
	},
	search: {
		query: '',
	},
	version: {
		id: '',
		name: 'Roadmap to MVP',
	},
});
