import { Tab } from 'semantic-ui-react'
import AboutUser from './AboutUser'
import UserEvent from './UserEvent'
import UserPhotos from './UserPhotos'

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <AboutUser profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'Photos',
      render: () => (
        <UserPhotos profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'Events',
      render: () => <UserEvent profile={profile}>Events</UserEvent>,
    },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
  ]
  return (
    <Tab
      menu={{ fluid: true, vertical: false }}
      menuPosition="left"
      panes={panes}
    />
  )
}
