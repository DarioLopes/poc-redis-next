'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { CreateSessionActionState } from '../session/crud/session-create-action';

export type SessionState = CreateSessionActionState;

type SessionContextValue = {
	session: SessionState;
	setSession: (session: SessionState) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider = ({ initialSession, children }: { initialSession: SessionState; children: ReactNode }) => {
	const [session, setSession] = useState<SessionState>(initialSession);

	return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
	const ctx = useContext(SessionContext);

	if (!ctx) throw new Error('useSession must be used within SessionProvider');

	return ctx;
};
