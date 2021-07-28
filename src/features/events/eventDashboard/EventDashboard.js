import { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from './EventFilters'
import EventList from './EventList'

import { listenToEventsFirestore } from '../../../app/firebase/firebaseFirestore'
import { listenToEvents } from '../eventActions'
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection'

export default function EventDashboard() {
  const [filter, setFilter] = useState(
    new Map([
      ['filter', 'all'],
      ['startDate', new Date()],
    ])
  )
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)

  useFirestoreCollection({
    query: () => listenToEventsFirestore(filter),
    data: (eventsData) => dispatch(listenToEvents(eventsData)),
    deps: [dispatch, filter],
  })

  function handleFilters(key, value) {
    setFilter(new Map(filter.set(key, value)))
  }
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
        <EventFilters
          filter={filter}
          setFilter={handleFilters}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  )
}
