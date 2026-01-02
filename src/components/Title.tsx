import { ReactNode } from 'react';

export const Title = ({ children }: { children: ReactNode }) => {
	return <h2 className="uppercase font-bold text-center mb-4 pb-4 border-b border-gray-800 w-full">{children}</h2>;
};
