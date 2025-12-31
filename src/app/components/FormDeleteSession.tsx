import { deleteSessionAction } from '@/utils/session/crud/session-delete-action';

export const FormDeleteSession = () => {
	return (
		<form action={deleteSessionAction} className="w-full max-w-xs border border-gray-800 lg:min-w-xs rounded-md p-4">
			<button type="submit" className="rounded w-full bg-red-600 px-4 py-2 text-white hover:bg-red-700">
				Delete Session
			</button>
		</form>
	);
};
