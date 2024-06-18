import {
	Drawer,
	List,
	Box,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import NavListItem from '../NavigationListItem/NavigationListItem';

function NavigationBar() {
	const { applicationStore } = useStore();

	return (
		<Drawer
			variant="temporary"
			onClose={() => applicationStore.toggleDrawer()}
			open={applicationStore.drawerIsOpen}
			anchor="left"
		>
			<Box sx={{ width: 150 }} onClick={() => applicationStore.toggleDrawer()}>
				<List>
					<NavListItem path="/" label="Home" />
					<NavListItem path="concert-list" label="Concerts" />
				</List>
			</Box>
		</Drawer>
	);
}

export default observer(NavigationBar);
