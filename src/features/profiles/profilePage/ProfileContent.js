import { Tab } from 'semantic-ui-react';
import AboutUser from './AboutUser';

export default function ProfileContent({ profile, isCurrentUser }) {
	const panes = [
		{ menuItem: 'About', render: () => <AboutUser profile={profile} isCurrentUser={isCurrentUser} /> },
		{ menuItem: 'Photos', render: () => <Tab.Pane>Photos</Tab.Pane> },
		{ menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
		{ menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
		{ menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
	];
	return <Tab menu={{ fluid: true, vertical: false }} menuPosition="left" panes={panes} />;
}