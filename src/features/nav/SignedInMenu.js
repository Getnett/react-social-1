import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFirebaseUser } from '../../app/firebase/firebaseAuth';
export default function SignedInMenu() {
	const { currentUserProfile } = useSelector((state) => state.profile);

	const history = useHistory();

	async function handleSignOut() {
		history.push('/');
		await signOutFirebaseUser();
	}
	return (
		<Menu.Item position="right">
			<Image avatar spaced="right" src={currentUserProfile.photoURL || '/assets/user.png'} />
			<Dropdown pointing="top left" text={currentUserProfile.displayName}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
					<Dropdown.Item text="My profile " icon="user" as={Link} to={`/profile/${currentUserProfile.id}`} />
					<Dropdown.Item text="My account" as={Link} to="/account" icon="settings" />
					<Dropdown.Item text="Log out" onClick={handleSignOut} icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
