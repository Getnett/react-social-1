import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import PhotoAddWidget from '../../../app/common/photos/PhotoAddWidget'
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firebase/firebaseFirestore'
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection'
import { listenToUserPhotos } from '../profileActions'

export default function UserPhotos({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false)
  const [photoUpdate, setPhotoUpdate] = useState({
    isUpdating: false,
    target: null,
  })
  const [photoDelete, setPhotoDelete] = useState({
    isDeleting: false,
    target: null,
  })
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.async)
  const { userPhotos } = useSelector((state) => state.profile)
  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (data) => dispatch(listenToUserPhotos(data)),
    deps: [profile.id, dispatch],
  })

  async function handleSetMainPhoto(photo, target) {
    setPhotoUpdate({ isUpdating: true, target })
    try {
      await setMainPhoto(photo)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPhotoUpdate({ isUpdating: false, target: null })
    }
  }
  async function handleDeletePhoto(photo, target) {
    setPhotoDelete({ isDeleting: true, target })
    try {
      await deletePhotoFromCollection(photo.filename)
      await deletePhotoFromCollection(photo.id)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPhotoDelete({ isDeleting: false, target: null })
    }
  }
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode((prevState) => !prevState)}
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoAddWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {userPhotos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        photoUpdate.isUpdating &&
                        photoUpdate.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      basic
                      color="green"
                      content="Main"
                    />
                    <Button
                      name={photo.id}
                      loading={
                        photoDelete.isDeleting &&
                        photoDelete.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      basic
                      color="red"
                      icon="trash"
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
