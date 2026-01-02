'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { CreateSessionActionState } from '../session/crud/session-create-action';
import { deleteSessionAction } from '../session/crud/session-delete-action';

export type SessionState = CreateSessionActionState;

type SessionContextValue = {
	session: SessionState;
	setSession: (session: SessionState) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider = ({ initialSession, children }: { initialSession: SessionState; children: ReactNode }) => {
	const [session, setSession] = useState<SessionState>(initialSession);

	const didCleanupRef = useRef(false);

	useEffect(() => {
		if (didCleanupRef.current) return;

		if (initialSession.status === 'empty') {
			didCleanupRef.current = true;
			// trigger session deletion on the server side
			// useful when session is deleted manually on Redis insights or CLI
			deleteSessionAction();
		}
	}, [initialSession.status]);

	return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
	const ctx = useContext(SessionContext);

	if (!ctx) throw new Error('useSession must be used within SessionProvider');

	return ctx;
};
