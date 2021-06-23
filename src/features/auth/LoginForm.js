import { Form, Formik } from 'formik';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import TextInput from '../../app/common/form/TextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInUser } from './authActions';
import { closeModal } from '../../app/common/modals/modalReducer';
export default function LoginForm() {
	const dispatch = useDispatch();
	return (
		<ModalWrapper size="mini" header="Sign In">
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(signInUser(values));
					setSubmitting(false);
					dispatch(closeModal());
				}}
			>
				{({ isSubmitting, isValid, dirty }) => (
					<Form autoComplete="off" className="ui form">
						<TextInput name="email" type="email" placeholder="Your email" />
						<TextInput name="password" type="password" placeholder="Password" />
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							fluid
							size="large"
							color="red"
							content="Sign In"
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
