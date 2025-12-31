'use client';

import { countryList } from '@/utils/helpers/countrylist';
import { useSession } from '@/utils/providers/SessionProvider';
import { createSessionAction, CreateSessionActionState } from '@/utils/session/crud/session-create-action';
import { useActionState, useEffect } from 'react';

const initialState: CreateSessionActionState = { status: 'idle' };

export const FormCreateSession = () => {
	const [state, formAction, isPending] = useActionState(createSessionAction, initialState);
	const { setSession } = useSession();

	useEffect(() => {
		if (state && state.status === 'success' && state.session) {
			console.log('Setting session in provider:', state.session);

			setSession(state);
		}
	}, [state, setSession]);

	return (
		<form action={formAction} className="flex flex-col items-center w-full max-w-xs lg:min-w-xs border border-gray-800 rounded-md p-4">
			{/* Username */}
			<input
				required
				type="text"
				id="username"
				name="username"
				placeholder="Username"
				className="border border-gray-800 rounded-md p-2 mb-4 w-full disabled:opacity-80"
				pattern="^[a-za-zäàâçéèêëîïôöûùüÿæœA-Z0-9_]{3,16}$"
				disabled={isPending}
			/>

			{/* Age */}
			<input
				type="number"
				id="age"
				name="age"
				placeholder="Age"
				min={18}
				max={100}
				className="border border-gray-800 rounded-md p-2 mb-4 w-full disabled:opacity-80"
				disabled={isPending}
			/>

			{/* Country */}
			<select name="country" id="country" className="border border-gray-800 rounded-md p-2 mb-4 w-full disabled:opacity-80" disabled={isPending}>
				<option value="">Select a country</option>
				{countryList.map((country) => (
					<option key={country.value} value={country.value}>
						{country.label}
					</option>
				))}
			</select>

			{/* Preferences checkboxes group */}
			<div className="flex flex-col mb-4 w-full">
				<label className="mb-2 font-medium">Preferences:</label>
				<div className="flex flex-col space-y-2">
					<label>
						<input type="checkbox" name="preferences" value="newsletters" className="mr-2" disabled={isPending} />
						Newsletters
					</label>
					<label>
						<input type="checkbox" name="preferences" value="updates" className="mr-2" disabled={isPending} />
						Product Updates
					</label>
					<label>
						<input type="checkbox" name="preferences" value="offers" className="mr-2" disabled={isPending} />
						Special Offers
					</label>
				</div>
			</div>

			<button type="submit" disabled={isPending} className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 disabled:opacity-60 w-full">
				{isPending ? 'Creating...' : 'Create Session'}
			</button>

			{state.status === 'success' ? <p className="mt-3 text-green-50">Session created for: {state.session.username}</p> : null}

			{state.status === 'error' ? <p className="mt-3 text-red-700">{state.message}</p> : null}
		</form>
	);
};
