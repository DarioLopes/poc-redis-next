'use client';

import { useSession } from '@/utils/providers/SessionProvider';
import { deleteSessionAction } from '@/utils/session/crud/session-delete-action';
import { useActionState, useEffect } from 'react';

const initialState = { status: 'idle', message: '' }; // Not empty or will clean session immediately after page reload

export const FormDeleteSession = () => {
	const [state, action, isPending] = useActionState(async () => await deleteSessionAction(), initialState);

	const { setSession } = useSession();

	useEffect(() => {
		if (state.status === 'empty') setSession({ status: 'empty' });
	}, [state, setSession]);

	return (
		<form action={action} className="w-full max-w-xs border border-gray-800 lg:min-w-xs rounded-md p-4">
			<button type="submit" className="rounded w-full bg-red-600 px-4 py-2 text-white hover:bg-red-700">
				{isPending ? 'Loading...' : 'Delete Session'}
			</button>

			{state?.status === 'success' && <p className="mt-2 text-green-500">Session deleted successfully.</p>}
		</form>
	);
};
