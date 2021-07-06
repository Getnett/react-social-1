import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
export default function SignedOutMenu() {
	const dispatch = useDispatch();
	return (
		<Menu.Item position="right">
			<Button basic inverted onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))} content="Login" />
			<Button
				basic
				inverted
				onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
				content="Register"
				style={{ marginLeft: '.5em' }}
			/>
		</Menu.Item>
	);
}
