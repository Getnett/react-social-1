import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFirebaseUser } from '../../app/firebase/firebaseAuth';
export default function SignedInMenu() {
	const { currentUser } = useSelector((state) => state.auth);

	const history = useHistory();

	async function handleSignOut() {
		signOutFirebaseUser();
		history.push('/');
	}
	return (
		<Menu.Item position="right">
			<Image avatar spaced="right" src={currentUser.photoURL || '/assets/user.png'} />
			<Dropdown pointing="top left" text={currentUser.email}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="createEvent" text="Create Event" icon="plus" />
					<Dropdown.Item text="My profile " icon="user" />
					<Dropdown.Item text="Log out" onClick={handleSignOut} icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
