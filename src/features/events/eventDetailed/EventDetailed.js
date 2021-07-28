import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { listenToEventFirestore } from '../../../app/firebase/firebaseFirestore'
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { listenToEvents } from '../eventActions'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedSidBar from './EventDetailedSideBar'

export default function EventDetailed({ match }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const event = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id)
  )

  const { loading, error } = useSelector((state) => state.async)
  const isHost = currentUser && currentUser.uid === (event && event.hostUid)
  const isGoing =
    event &&
    event.attendees &&
    event.attendees.some((a) => a.id === currentUser && currentUser.uid)

  useFirestoreDoc({
    query: () => listenToEventFirestore(match.params.id),
    data: (eventData) => dispatch(listenToEvents([eventData])),
    deps: [match.params.id, dispatch],
  })

  if ((loading || !event) && !error) {
    return <LoadingComponent />
  }
  if (error) return <Redirect to="/not-found" />
  return (
    <Grid>
      <Grid.Column width="10">
        <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width="6">
        <EventDetailedSidBar
          attendees={event && event.attendees}
          host={event && event.hostUid}
        />
      </Grid.Column>
    </Grid>
  )
}
