import { useStore } from '../../store/StoreContext';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Box, Container, Typography, Grid } from '@mui/material';
import Card from '../../components/Card/Card';

function ConcertListPage() {
	const { concertStore } = useStore();

	useEffect(() => {
		concertStore.fetchAllConcerts();
	}, [concertStore]);

	const handleConcertCreation = () => {
		concertStore.addConcert({
			band: 'The Band',
			url: 'https://i.pinimg.com/736x/8b/9a/cc/8b9accffb72cd44f2144d93800b3694d--rammstein-concert-rammstein-till-lindemann.jpg',
			year: 2025,
		});
	};

	if (concertStore.loading) {
		return <div>Loading...</div>;
	}

	if (concertStore.error) {
		return <div>Error: {concertStore.error}</div>;
	}

	return (
		<>
			<Box>
				<Container maxWidth="md" component="section">
					<Typography variant="h3">This is Concerts List page</Typography>
				</Container>
				<Container maxWidth="md" component="section">
					<Grid container spacing={2}>
						{toJS(concertStore.concerts).map((concert) => (
							<Card key={concert.id} {...concert} />
						))}
					</Grid>

					<button onClick={handleConcertCreation}>ADD HARDCODED CONCERT</button>
				</Container>
			</Box>
		</>
	);
}

export default observer(ConcertListPage);
