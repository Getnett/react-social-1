import { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import cuid from 'cuid'
import { toast } from 'react-toastify'
import PhotoCropper from './PhotoCropper'
import PhotoUploadDropzone from './PhotoUploadDropzone'

import { getFileExtesion } from '../../util/util'
import { uploadToFirebaseStoarge } from '../../firebase/firebaseAuth'

import { updateUserProfilePhoto } from '../../firebase/firebaseFirestore'

export default function PhotoAddWidget({ setEditMode }) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleCancelCrop() {
    setFiles([])
    setImage(null)
  }
  function handleUploadImage() {
    setLoading(true)
    const filename = `${cuid()} + '.' + ${getFileExtesion(files[0].name)}`
    const uploadTask = uploadToFirebaseStoarge(image, filename)

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        toast.error(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false)
              handleCancelCrop()
              setEditMode(false)
            })
            .catch((error) => {
              toast.error(error)
              setLoading(false)
            })
        })
      }
    )
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step1 - Upload photo" />
        <PhotoUploadDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step2 - Resize " />
        {files.length > 0 && (
          <PhotoCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step1 - Preview & Upload" />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minWidth: 200, minHeight: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon="close"
              />
            </Button.Group>{' '}
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}
