import { SessionProvider } from '@/utils/providers/SessionProvider';
import { readSessionAction } from '@/utils/session/crud/session-read-action';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Next + Redis Session Management',
	description: 'Proof of concept for session management using Next.js and Redis.',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	const session = await readSessionAction();

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SessionProvider initialSession={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
