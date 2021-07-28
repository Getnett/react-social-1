import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { getUserEventsQuery } from '../../../app/firebase/firebaseFirestore'
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection'
import { listenToUserEvents } from '../profileActions'

export default function UserEvent({ profile }) {
  const dispatch = useDispatch()
  const [activePane, setActivePane] = useState(0)
  const { loading } = useSelector((state) => state.async)
  const { profileEvents } = useSelector((state) => state.profile)
  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ]
  useFirestoreCollection({
    query: () => getUserEventsQuery(activePane, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activePane, profile.id],
  })
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Events" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) => {
              console.log('[ACTTIVE-TAB]', data, data.activeIndex)
              setActivePane(data.activeIndex)
            }}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {profileEvents.map((event) => (
              <Card key={event.id} as={Link} to="/events">
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign="center" />
                  <Card.Meta textAlign="center">
                    <div>{format(event.date, 'dd mm yyyyy')}</div>
                    <div>{format(event.date, 'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
