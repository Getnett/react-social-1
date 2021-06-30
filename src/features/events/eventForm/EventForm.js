import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';

import { Link, Redirect } from 'react-router-dom';
import { listenToEvents } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/api/categoryOptions';
import DatePicker from '../../../app/common/form/DatePicker';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import {
	addEventToFirestore,
	cancelEventInFirestore,
	listenToEventFirestore,
	updateEventInFirestore,
} from '../../../app/firebase/firebaseFirestore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
export default function EventForm({ match, history }) {
	const selectedEvent = useSelector((state) => state.event.events.find((evt) => evt.id === match.params.id));
	const { loading, error } = useSelector((state) => state.async);
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
	useFirestoreDoc({
		query: () => listenToEventFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch],
		shouldExecute: !!match.params.id,
	});
	if (loading) {
		return <LoadingComponent />;
	}
	if (error) return <Redirect to="/not-found" />;
	return (
		<Segment clearing>
			<Header content={selectedEvent ? 'Edit event ' : 'Create New Event'} />
			<Formik
				validationSchema={validationSchema}
				initialValues={initialFormState}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent ? await updateEventInFirestore(values) : await addEventToFirestore(values);
						setSubmitting(false);
						history.push('/events');
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
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
						{selectedEvent && (
							<Button
								type="button"
								floated="left"
								color={selectedEvent.isCancelled ? 'green' : 'red'}
								content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
								onClick={() => cancelEventInFirestore(selectedEvent)}
							/>
						)}

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
