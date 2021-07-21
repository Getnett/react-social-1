import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react'
import { format } from 'date-fns'

import EventListAttendee from './EventListAttendee'
import { deleteEventInFirestore } from '../../../app/firebase/firebaseFirestore'

export default function EventListItem({ event }) {
  return (
    <>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description> Hosted By{event.hostedBy}</Item.Description>
                {event.isCancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="Event has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date, 'MMMM d,yyyy, H:mm a')}
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees.map((attendee) => (
              <EventListAttendee attendee={attendee} key={attendee.id} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <p>{event.description}</p>
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
          <Button
            onClick={() => deleteEventInFirestore(event.id)}
            color="red"
            floated="right"
            content="Delete"
          />
        </Segment>
      </Segment.Group>
    </>
  )
}
