'use server';

import { getSessionId, redis } from '@/utils/session'; // ajuste le chemin
import { SessionData } from './session-create-action';
// ou utilise tes helpers si tu en as (mais ici on évite getSessionIdAndCreateIfMissing)

export type UpdateSessionActionState =
	| { status: 'idle' }
	| { status: 'empty'; message?: string }
	| { status: 'error'; message: string }
	| { status: 'success'; session: SessionData };

export const updateSessionAction = async (_prev: UpdateSessionActionState, formData: FormData, namespace: string = ''): Promise<UpdateSessionActionState> => {
	const sessionId = await getSessionId();

	if (!sessionId) {
		return {
			status: 'error',
			message: 'No session found (missing session-id cookie).',
		};
	}

	const username = String(formData.get('username') ?? '').trim();
	const age = String(formData.get('age') ?? '').trim();
	const country = String(formData.get('country') ?? '').trim();

	// Handle JSON array from form preferences checkboxes
	const formPreferences = formData.getAll('preferences').map(String);
	const preferences = {} as SessionData['preferences'];

	if (formPreferences.length > 0) {
		formPreferences.forEach((pref) => {
			preferences[pref as keyof SessionData['preferences']] = true;
		});
	}

	console.log('Preferences to update:', formPreferences, preferences);

	// Update only provided fields
	const updates = {} as Partial<SessionData>;
	if (username) updates.username = username;
	if (age) updates.age = age;
	if (country) updates.country = country;
	if (Object.keys(preferences).length > 0) updates.preferences = JSON.stringify(preferences) as SessionData['preferences'];

	if (Object.keys(updates).length === 0) {
		return { status: 'error', message: 'Nothing to update.' };
	}

	// console.log('Updating session with ID:', sessionId, 'with data:', updates);

	await redis.hset(`session-${namespace}-${sessionId}`, updates);

	return { status: 'success', session: { username, age, country, preferences } };
};
