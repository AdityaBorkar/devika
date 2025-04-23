import { atom } from 'jotai';

export const PrdScreenStateAtom = atom({
	tab: 'explorer',
	explorer: {
		pageId: '',
	},
	search: {
		query: '',
	},
	versioning: {
		id: '',
		name: 'Roadmap to MVP',
	},
});
