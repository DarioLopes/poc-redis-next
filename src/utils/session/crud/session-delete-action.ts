'use server';

import { deleteSession } from '..';

export const deleteSessionAction = async (): Promise<{ status: 'success' | 'empty'; message: string }> => {
	return await deleteSession(); // default namespace
};
