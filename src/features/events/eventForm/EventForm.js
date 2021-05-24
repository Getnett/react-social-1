import { useState } from 'react';
import { Button, Form, Header, Icon, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
export default function EventForm({ setOpenForm, createEvent, selectedEvent, updateEvent }) {
	const initialFormState = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
	};
	const [eventForm, setEventForm] = useState(initialFormState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEventForm({ ...eventForm, [name]: value });
	};
	const submitFormHandler = () => {
		selectedEvent
			? updateEvent({ ...selectedEvent, ...eventForm })
			: createEvent({
					...eventForm,
					id: cuid(),
					hostedBy: 'Getnet',
					attendees: [
						{
							id: 'a',
							name: 'Bob',
							photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
						},
						{
							id: 'b',
							name: 'Tom',
							photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
						},
					],
					hostPhotoURL: '/assets/user.png',
			  });
		setOpenForm(false);
	};
	return (
		<Segment clearing>
			<Header content={selectedEvent ? 'Edit event ' : 'Create New Event'} />
			<Form onSubmit={submitFormHandler}>
				<Form.Field>
					<input
						name="title"
						value={eventForm.title}
						onChange={(e) => handleInputChange(e)}
						type="text"
						placeholder="Event Title"
					/>
				</Form.Field>
				<Form.Field>
					<input
						name="category"
						value={eventForm.category}
						onChange={(e) => handleInputChange(e)}
						type="text"
						placeholder="Event Category"
					/>
				</Form.Field>
				<Form.Field>
					<input
						name="description"
						value={eventForm.description}
						onChange={(e) => handleInputChange(e)}
						type="text"
						placeholder="Event Description"
					/>
				</Form.Field>
				<Form.Field>
					<input
						name="city"
						value={eventForm.city}
						onChange={(e) => handleInputChange(e)}
						type="text"
						placeholder="City"
					/>
				</Form.Field>
				<Form.Field>
					<input
						name="venue"
						value={eventForm.venue}
						onChange={(e) => handleInputChange(e)}
						type="text"
						placeholder="Venue"
					/>
				</Form.Field>
				<Form.Field>
					<input name="date" value={eventForm.value} onChange={(e) => handleInputChange(e)} type="date" />
				</Form.Field>
				<Button type="submit" floated="right" positive content="submit" />
				<Button as={Link} to="/events" type="submit" floated="right" content="cancel" />
			</Form>
		</Segment>
	);
}
