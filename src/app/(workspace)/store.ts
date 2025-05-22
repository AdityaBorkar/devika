import { atom } from "jotai";

export const workspaceIdAtom = atom<string>("g11q2tpg4jqxpfhfri7cbuxa");

export const userAtom = atom({
	id: "g11q2tpg4jqxpfhfri7cbuxa",
	name: "John Doe",
	email: "john.doe@example.com",
	avatar: "https://example.com/avatar.png",
	createdAt: new Date(),
	updatedAt: new Date(),
});
