import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import TextArea from '../../../app/common/form/TextArea'
import TextInput from '../../../app/common/form/TextInput'
import { updateUserProfile } from '../../../app/firebase/firebaseFirestore'

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values)
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <TextInput name="displayName" placeholder="Display Name" />
          <TextArea name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            floated="right"
            positive
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
            size="large"
            content="Update Profile"
          />
        </Form>
      )}
    </Formik>
  )
}
