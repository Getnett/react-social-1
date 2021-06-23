import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Segment, Select } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/api/categoryOptions';
import DatePicker from '../../../app/common/form/DatePicker';
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
				{({ isSubmitting, dirty, isValid }) => (
					<Form className="ui form">
						<TextInput name="title" placeholder="Event Title" />
						<SelectInput name="category" placeholder="Event Category" options={categoryOptions} />
						<TextArea name="description" placeholder="Event Description" rows="3" />
						<TextInput name="city" placeholder="City" />
						<TextInput name="venue" placeholder="Venue" />
						<DatePicker
							name="date"
							placeholderText="Event date"
							timeFormat="HH:mm"
							showTimeSelect
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm a"
						/>

						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							floated="right"
							positive
							content="submit"
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to="/events"
							type="submit"
							floated="right"
							content="cancel"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
