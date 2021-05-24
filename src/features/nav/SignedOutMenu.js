import { Button, Menu } from 'semantic-ui-react';
export default function SignedOutMenu({ setAuthenticated }) {
	return (
		<Menu.Item position="right">
			<Button basic inverted onClick={() => setAuthenticated(true)} content="Login" />
			<Button basic inverted content="Register" style={{ marginLeft: '.5em' }} />
		</Menu.Item>
	);
}
