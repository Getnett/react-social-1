import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async)
  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || 'Opps we have an error'}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="return back to events"
      />
    </Segment>
  )
}
