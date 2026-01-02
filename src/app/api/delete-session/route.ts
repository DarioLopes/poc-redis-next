import { deleteSession } from '@/utils/session';

export async function GET() {
	await deleteSession();

	return Response.json({ message: 'Session deleted successfully.' });
}
