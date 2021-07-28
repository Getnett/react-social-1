import { Link } from 'react-router-dom'
import { Segment, Header, Item, Button, Image } from 'semantic-ui-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  addUserAttendanceToEvent,
  cancelUserEventAttendance,
} from '../../../app/firebase/firebaseFirestore'

const eventImageStyle = {
  filter: 'brightness(30%)',
}

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
}

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false)

  async function handleJoinEvent(event) {
    setLoading(true)
    try {
      await addUserAttendanceToEvent(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  async function handleCancelEvent(event) {
    setLoading(true)
    try {
      await cancelUserEventAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          style={eventImageStyle}
          fluid
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(event.date, 'MMMM d,yyyy, H:mm a')}</p>
                <p>
                  Hosted by{' '}
                  <strong>
                    {' '}
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hostedBy}
                    </Link>{' '}
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && (
          <>
            {isGoing ? (
              <Button
                onClick={() => handleCancelEvent(event.id)}
                loading={loading}
              >
                Cancel My Place
              </Button>
            ) : (
              <Button
                onClick={() => handleJoinEvent(event.id)}
                loading={loading}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
}
