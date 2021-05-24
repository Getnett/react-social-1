import { Grid } from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidBar from './EventDetailedSideBar';

export default function EventDetailed() {
	return (
		<Grid>
			<Grid.Column width="10">
				<EventDetailedHeader />
				<EventDetailedInfo />
				<EventDetailedChat />
			</Grid.Column>
			<Grid.Column width="6">
				<EventDetailedSidBar />
			</Grid.Column>
		</Grid>
	);
}
