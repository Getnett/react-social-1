import { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';
export default function EventDashboard() {
	const [events, setEvents] = useState(sampleData);

	// function createEvent(eventDataForm) {
	// 	setEvents([...events, eventDataForm]);
	// }
	// function updateEvent(updateEvent) {
	// 	setEvents(events.map((event) => (event.id === updateEvent.id ? updateEvent : event)));
	// }
	function deleteEvent(deleteEvent) {
		setEvents(events.filter((event) => event.id !== deleteEvent.id));
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={events} deleteEvent={deleteEvent} />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Event filters</h2>
			</Grid.Column>
		</Grid>
	);
}
