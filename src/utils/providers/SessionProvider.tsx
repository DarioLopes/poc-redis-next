'use client';

import { createContext, useContext, useState } from 'react';
import { ReadSessionActionState } from '../session/crud/session-read-action';

export type SessionState = ReadSessionActionState;

type SessionContextValue = {
	session: SessionState;
	setSession: (session: SessionState) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider = ({ initialSession, children }: { initialSession: SessionState; children: React.ReactNode }) => {
	const [session, setSession] = useState<SessionState>(initialSession);

	return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
	const ctx = useContext(SessionContext);
	if (!ctx) {
		throw new Error('useSession must be used within SessionProvider');
	}
	return ctx;
};
