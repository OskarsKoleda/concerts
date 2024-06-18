import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import ConcertListPage from '../pages/ConcertList/ConcertList';
import Layout from '../pages/Layout/Layout';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<HomePage />} />
					<Route path="concert-list" element={<ConcertListPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
