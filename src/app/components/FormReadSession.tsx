'use client';

import { useSession } from '@/utils/providers/SessionProvider';
import { ReadSessionActionState, readSessionAction } from '@/utils/session/crud/session-read-action';
import { useActionState, useState } from 'react';
import { Title } from './Title';

const initialState: ReadSessionActionState = { status: 'idle' };

export const FormReadSession = () => {
	const [hasClicked, setHasClicked] = useState(false);
	const [state, action, isPending] = useActionState(async () => await readSessionAction(), initialState);

	const { session } = useSession();

	return (
		<form action={action} className="flex flex-col items-center gap-3 w-full max-w-xs lg:min-w-xs border border-gray-800 rounded-md p-4">
			<Title>Read</Title>

			<button type="submit" disabled={isPending} className="bg-gray-800 mb-2 text-white px-4 py-2 rounded disabled:opacity-60 w-full" onClick={() => setHasClicked(true)}>
				{isPending ? 'Loading...' : 'Read session from server'}
			</button>

			{hasClicked && session.status !== 'empty' && state.status === 'success' && (
				<div className="rounded-lg border border-gray-800 p-4 w-full max-w-sm overflow-scroll">
					<button type="button" onClick={() => setHasClicked(false)} className="text-xs text-red-500 underline mb-2 w-fit ml-auto inline-block">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-4" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
						</svg>
					</button>

					<p className="font-semibold mb-2">{`Session values (from server action)`}</p>

					<ul className="text-sm space-y-1">
						{Object.entries(state.session).map(([key, value]) => (
							<li key={key}>
								<span className="font-mono text-gray-600">{key}: </span>
								<span className="font-semibold">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{session.status === 'idle' && <p className="text-gray-500">Loading...</p>}

			{session.status === 'empty' && <p className="text-gray-500">No session data found.</p>}

			{session.status === 'success' && (
				<div className="mt-2 rounded-lg border border-gray-800 p-4 w-full max-w-sm overflow-scroll">
					<p className="font-semibold mb-2">Session values</p>

					<ul className="text-sm space-y-1">
						{Object.entries(session.session).map(([key, value]) => (
							<li key={key}>
								<span className="font-mono text-gray-600">{key}: </span>
								<span className="font-semibold">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</form>
	);
};
