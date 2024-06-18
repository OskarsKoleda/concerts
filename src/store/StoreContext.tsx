import { createContext, ReactNode, useContext } from 'react';
import RootStore from './RootStore';

interface StoreProviderProps {
	children: ReactNode;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
	const store = new RootStore();
	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

export const useStore = () => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return store;
};
