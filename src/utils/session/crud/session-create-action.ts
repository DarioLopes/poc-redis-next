'use server';

import { setMany } from '@/utils/session/session-store';

export type SessionData = {
	username: string;
	age: string;
	country: string;
	preferences: {
		offers?: boolean;
		newsletters?: boolean;
		updates?: boolean;
	};
};

export type CreateSessionActionState =
	| { status: 'idle' }
	| { status: 'empty'; message?: string }
	| { status: 'error'; message: string }
	| { status: 'success'; session: SessionData };

export const createSessionAction = async (_prevState: CreateSessionActionState, formData: FormData): Promise<CreateSessionActionState> => {
	const username = String(formData.get('username') ?? '').trim();
	const age = String(formData.get('age') ?? 'unknown').trim();
	const country = String(formData.get('country') ?? 'unknown').trim();

	// Handle JSON array from form preferences checkboxes
	const formPreferences = formData.getAll('preferences').map(String);
	const preferences: Record<string, boolean> = {};

	if (!username) return { status: 'error', message: 'Username is required.' };

	if (formPreferences.length > 0) {
		formPreferences.forEach((pref) => {
			preferences[pref] = true;
		});
	}

	await setMany({
		username,
		age,
		country,
		preferences: JSON.stringify(preferences),
	});

	return { status: 'success', session: { username, age, country, preferences } };
};
