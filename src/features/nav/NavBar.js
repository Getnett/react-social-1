import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar({ setOpenForm }) {
	const [authenticated, setAuthenticated] = useState(false);
	const history = useHistory();

	function handleSignOut() {
		setAuthenticated(false);
		history.push('/');
	}
	return (
		<Menu icon inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img src="/assets/logo.png" alt="logo" />
				</Menu.Item>
				<Menu.Item as={NavLink} to="/events" name="Events" />
				{authenticated && (
					<Menu.Item as={NavLink} exact to="/createEvent">
						<Button positive inverted content="Create Event" />
					</Menu.Item>
				)}
				{authenticated ? (
					<SignedInMenu signOut={handleSignOut} />
				) : (
					<SignedOutMenu setAuthenticated={setAuthenticated} />
				)}
			</Container>
		</Menu>
	);
}
