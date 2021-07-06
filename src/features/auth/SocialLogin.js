import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogin } from '../../app/firebase/firebaseAuth';

export default function SocialLogin() {
	const dispatch = useDispatch();

	function handleSocialLogin(provider) {
		dispatch(closeModal());
		socialLogin(provider);
	}
	return (
		<>
			<Button
				onClick={() => handleSocialLogin('facebook')}
				icon="facebook"
				fluid
				color="facebook"
				content="Login with Facebook"
				style={{ marginBottom: 10 }}
			/>
			<Button
				onClick={() => handleSocialLogin('google')}
				icon="google"
				fluid
				color="google plus"
				content="Login with Google"
			/>
		</>
	);
}
