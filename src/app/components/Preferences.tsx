'use client';

import { useSession } from '@/utils/providers/SessionProvider';
import { useState } from 'react';

type PrefKey = 'newsletters' | 'updates' | 'offers';

export const Preferences = () => {
	const { session } = useSession();

	const hasSession = session.status === 'success' && 'session' in session;
	const defaults = hasSession ? ((typeof session.session?.preferences === 'string' ? JSON.parse(session.session?.preferences ?? '{}') : session.session?.preferences) ?? {}) : {};

	// undefined = not touched yet
	const [prefs, setPrefs] = useState<Partial<Record<PrefKey, boolean>> | undefined>(undefined);

	const getValue = (key: PrefKey) => {
		if (prefs && key in prefs) return !!prefs[key];
		return !!defaults?.[key];
	};

	const setValue = (key: PrefKey, next: boolean) => {
		setPrefs((prev) => ({ ...(prev ?? {}), [key]: next }));
	};

	return (
		<div className="flex flex-col mb-4 w-full">
			<label>
				<input
					type="checkbox"
					name="preferences"
					value="newsletters"
					checked={getValue('newsletters')}
					onChange={(e) => setValue('newsletters', e.target.checked)}
					className="mr-2"
				/>
				Newsletters
			</label>

			<label>
				<input type="checkbox" name="preferences" value="updates" checked={getValue('updates')} onChange={(e) => setValue('updates', e.target.checked)} className="mr-2" />
				Product Updates
			</label>

			<label>
				<input type="checkbox" name="preferences" value="offers" checked={getValue('offers')} onChange={(e) => setValue('offers', e.target.checked)} className="mr-2" />
				Special Offers
			</label>
		</div>
	);
};
