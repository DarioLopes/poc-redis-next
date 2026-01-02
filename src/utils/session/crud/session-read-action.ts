'use server';

import { getAll } from '@/utils/session/session-store';
import { SessionData } from './session-create-action';

export type ReadSessionActionState =
	| { status: 'idle' }
	| { status: 'empty'; message?: string }
	| { status: 'error'; message: string }
	| { status: 'success'; session: SessionData };

export const readSessionAction = async (): Promise<ReadSessionActionState> => {
	const sessionData = (await getAll()) as SessionData | null;

	if (!sessionData || Object.keys(sessionData).length === 0) return { status: 'empty', message: 'No session data found.' };

	return {
		status: 'success',
		session: sessionData,
	};
};
