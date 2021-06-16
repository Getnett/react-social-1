import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
export default function EventForm({ match, history }) {
	const selectedEvent = useSelector((state) => state.event.events.find((evt) => evt.id === match.params.id));
	const dispatch = useDispatch();
	const initialFormState = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('Title must not be empty'),
		category: Yup.string().required('Category must not be empty'),
		description: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
		date: Yup.string().required(),
	});
	return (
		<Segment clearing>
			<Header content={selectedEvent ? 'Edit event ' : 'Create New Event'} />
			<Formik
				validationSchema={validationSchema}
				initialValues={initialFormState}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
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
								})
						  );
					history.push('/events');
				}}
			>
				<Form className="ui form">
					<TextInput name="title" placeholder="Event Title" />
					<TextInput name="category" placeholder="Event Category" />
					<TextArea name="description" placeholder="Event Description" rows="3" />
					<TextInput name="city" placeholder="City" />
					<TextInput name="venue" placeholder="Venue" />
					<TextInput name="date" placeholder="Venue" type="date" />
					<Button type="submit" floated="right" positive content="submit" />
					<Button as={Link} to="/events" type="submit" floated="right" content="cancel" />
				</Form>
			</Formik>
		</Segment>
	);
}
