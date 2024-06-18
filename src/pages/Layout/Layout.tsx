import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

function Layout() {
	return (
		<>
      <Header/>
      <NavigationBar/>
			<Outlet />
		</>
	);
}

export default Layout;
