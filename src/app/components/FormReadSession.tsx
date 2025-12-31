'use client';

import { ReadSessionActionState, readSessionAction } from '@/utils/session/crud/session-read-action';
import * as React from 'react';

const initialState: ReadSessionActionState = { status: 'idle' };

export const FormReadSession = () => {
	const [state, action, isPending] = React.useActionState(async () => await readSessionAction(), initialState);

	return (
		<form action={action} className="flex flex-col items-center gap-3 w-full max-w-xs lg:min-w-xs border border-gray-800 rounded-md p-4">
			<button type="submit" disabled={isPending} className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-60 w-full">
				{isPending ? 'Loading...' : 'Read session'}
			</button>

			{state.status === 'empty' && <p className="text-gray-500">No session data found.</p>}

			{state.status === 'success' && (
				<div className="mt-2 rounded-lg border border-gray-800 p-4 w-full max-w-sm">
					<p className="font-semibold mb-2">Session values</p>

					<ul className="text-sm space-y-1">
						{Object.entries(state.data).map(([key, value]) => (
							<li key={key}>
								<span className="font-mono text-gray-600">{key}</span>: <span className="font-semibold">{value}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</form>
	);
};
