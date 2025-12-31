'use client';

import { countryList } from '@/utils/helpers/countrylist';
import { useSession } from '@/utils/providers/SessionProvider';
import { updateSessionAction, UpdateSessionActionState } from '@/utils/session/crud/session-update-action';
import { useActionState, useState } from 'react';
import { Preferences } from './Preferences';

const initialState: UpdateSessionActionState = { status: 'idle' };

export const FormUpdateSession = () => {
	const [state, action, isPending] = useActionState(updateSessionAction, initialState);

	const { session } = useSession();

	// Default values
	const hasSession = session.status === 'success' && 'session' in session;
	const defaultValue = hasSession ? session.session : undefined;

	// Handle dropdown controlled value
	const defaultCountry = hasSession ? (session.session?.country ?? '') : '';
	const [country, setCountry] = useState<string | undefined>(undefined);
	const value = country ?? defaultCountry;

	console.log('Current session from provider:', session);

	return (
		<form action={action} className="flex flex-col items-center gap-3 w-full max-w-xs lg:min-w-xs border border-gray-800 rounded-md p-4">
			<p className="text-lg font-semibold">Update session</p>

			<input
				type="text"
				name="username"
				placeholder="Username (optional)"
				className="border border-gray-800 rounded-md p-2 w-full"
				pattern="^[a-za-zäàâçéèêëîïôöûùüÿæœA-Z0-9_]{3,16}$"
				disabled={isPending}
				defaultValue={defaultValue?.username}
			/>

			<input
				type="number"
				name="age"
				placeholder="Age (optional)"
				min={18}
				max={100}
				className="border border-gray-800 rounded-md p-2 w-full"
				disabled={isPending}
				defaultValue={defaultValue?.age}
			/>

			{/* Country */}
			<select
				name="country"
				id="country"
				className="border border-gray-800 rounded-md p-2 mb-4 w-full disabled:opacity-80"
				value={value}
				onChange={(e) => setCountry(e.target.value)}
				disabled={isPending}
			>
				<option value="">{`Select a country (optional)`}</option>
				{countryList.map((country) => (
					<option key={country.value} value={country.value}>
						{country.label}
					</option>
				))}
			</select>

			{/* Preferences checkboxes group */}
			<Preferences />

			<button type="submit" disabled={isPending} className="rounded bg-gray-800 px-4 py-2 text-white disabled:opacity-60 w-full">
				{isPending ? 'Updating...' : 'Update'}
			</button>

			{state.status === 'success' && <p className="text-green-700">Updated.</p>}
			{state.status === 'error' && <p className="text-red-700">{state.message}</p>}
		</form>
	);
};
