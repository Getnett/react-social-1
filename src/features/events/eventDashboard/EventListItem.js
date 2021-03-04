import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
export default function EventListItem({
  event,
  deleteEvent,
  setSelectedEvent,
}) {
  return (
    <>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>{event.category}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date}
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
            onClick={() => setSelectedEvent(event)}
            color="teal"
            floated="right"
            content="View"
          />
          <Button
            onClick={() => deleteEvent(event)}
            color="red"
            floated="right"
            content="Delete"
          />
        </Segment>
      </Segment.Group>
    </>
  );
}
