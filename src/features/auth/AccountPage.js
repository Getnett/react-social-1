import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Label, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import TextInput from '../../app/common/form/TextInput'
import { updateUserPassword } from '../../app/firebase/firebaseAuth'

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth)
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser.providerId === 'password' && (
        <>
          <Header color="teal" sub content="Change Your Password" />
          <p>Change your password below</p>

          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              newPassword: Yup.string().required('Password is required'),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref('newPassword'), null],
                'Passwords dont match'
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values)
              } catch (error) {
                setErrors({ auth: error.message })
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <TextInput
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                />
                <TextInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    content={errors.auth}
                    style={{ marginBottom: 10 }}
                  />
                )}
                <Button
                  style={{ display: 'block' }}
                  loading={isSubmitting}
                  type="submit"
                  content="Update Password"
                  size="large"
                  positive
                  disabled={!isValid || isSubmitting || !dirty}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header color="teal" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser.providerId === 'google.com' && (
        <>
          <Header color="teal" sub content="Google account" />
          <p>Please visit Google to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://accounts.google.com"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  )
}
