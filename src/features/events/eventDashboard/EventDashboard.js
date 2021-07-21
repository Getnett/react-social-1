import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from './EventFilters'
import EventList from './EventList'

import { listenToEventsFirestore } from '../../../app/firebase/firebaseFirestore'
import { listenToEvents } from '../eventActions'
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection'

export default function EventDashboard() {
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)

  useFirestoreCollection({
    query: () => listenToEventsFirestore(),
    data: (eventsData) => dispatch(listenToEvents(eventsData)),
    deps: [dispatch],
  })
  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />{' '}
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filters</h2>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}
