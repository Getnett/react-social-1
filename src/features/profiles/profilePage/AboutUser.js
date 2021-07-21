import { format } from 'date-fns'
import { useState } from 'react'
import { Button, Grid, Header, Tab } from 'semantic-ui-react'
import ProfileForm from './ProfileForm'

export default function AboutUser({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false)
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode((prevState) => !prevState)}
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Edit'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member since: {format(profile.createdAt, 'dd MMM yyyy')}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
