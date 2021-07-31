import cuid from 'cuid'
import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Header, Comment } from 'semantic-ui-react'
import {
  getEventChat,
  objectSnapshotToArray,
} from '../../../app/firebase/firebaseFirestore'
import { structureComments } from '../../../app/util/util'
import { listenToEventChat } from '../eventActions'
import { CLEAR_CHAT_COMMENTS } from '../eventConstants'
import EventDetailedChatForm from './EventDetailedChatForm'

export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.event)
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  })

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null })
  }
  useEffect(() => {
    getEventChat(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) {
        return
      }
      dispatch(
        listenToEventChat(objectSnapshotToArray(snapshot.val()).reverse())
      )
    })
    return () => {
      dispatch({ type: CLEAR_CHAT_COMMENTS })
      getEventChat().off()
    }
  }, [eventId, dispatch])
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} parentId={0} closeReply />
        <Comment.Group>
          {structureComments(comments).map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('\n').map((text) => (
                    <span key={cuid()}>
                      <span> {text}</span>
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({
                        open: true,
                        commentId: comment.id,
                      })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={comment.id}
                        closeReply={handleCloseReplyForm}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
              {comment.replys.length > 0 && (
                <Comment.Group>
                  {comment.replys.map((reply) => (
                    <Comment key={reply.id}>
                      <Comment.Avatar
                        src={reply.photoURL || '/assets/user.png'}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${reply.uid}`}>
                          {reply.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(reply.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {reply.text.split('\n').map((text) => (
                            <span key={cuid()}>
                              <span> {text}</span>
                              <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: reply.id,
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open &&
                            showReplyForm.commentId === reply.id && (
                              <EventDetailedChatForm
                                eventId={eventId}
                                parentId={reply.parentId}
                                closeReply={handleCloseReplyForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  )
}
