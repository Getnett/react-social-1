import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import { addEventChatComment } from '../../../app/firebase/firebaseFirestore'
import TextArea from '../../../app/common/form/TextArea'

export default function EventDetailedChatForm({
  eventId,
  parentId,
  closeReply,
}) {
  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={Yup.object({
        comment: Yup.string().required('comment is required enter some text'),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId })
          resetForm()
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
          closeReply({ open: false, commentId: null })
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="ui form">
          <TextArea name="comment" rows={2} placeholder="add a comment" />

          <Button
            loading={isSubmitting}
            content="Add reply"
            icon="edit"
            primary
            type="submit"
          />
        </Form>
      )}
    </Formik>
  )
}
