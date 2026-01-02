import { FormCreateSession } from '../components/FormCreateSession';
import { FormDeleteSession } from '../components/FormDeleteSession';
import { FormReadSession } from '../components/FormReadSession';
import { FormUpdateSession } from '../components/FormUpdateSession';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold mb-8">Redis + Next.JS session</h1>

			<div className="container">
				<div className="grid grid-cols-2 gap-4 w-fit mx-auto">
					<FormCreateSession />

					<FormReadSession />

					<FormDeleteSession />

					<FormUpdateSession />
				</div>
			</div>

			<p className="mt-4 text-lg">Session with Next.js + Redis</p>

			{/* Simple form to create a session  */}
		</main>
	);
}
