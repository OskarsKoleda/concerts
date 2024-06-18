import { Grid, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

interface ConcertProps {
	id?: string;
	band: string;
	year?: number;
	url: string;
}

function Card({ band, year, url }: ConcertProps) {
	return (
		<>
			<Grid item xs={4}>
				<Paper elevation={3}>
					<div style={{ overflow: 'hidden', position: 'relative' }}>
						<img
							src={url}
							alt="poster image"
							style={{
								width: '100%',
								display: 'block',
								maxHeight: '200px',
								objectFit: 'cover'
							}}
						/>
					</div>
					<div style={{ padding: '16px' }}>
						<Typography variant="h6">
							{band} - {year}
						</Typography>
						<Typography variant="body1">Some description is here</Typography>
					</div>
				</Paper>
			</Grid>
		</>
	);
}

export default observer(Card);
