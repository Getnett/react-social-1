import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Button, Divider, Label } from 'semantic-ui-react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import TextInput from '../../app/common/form/TextInput'
import { closeModal } from '../../app/common/modals/modalReducer'
import { signInWithEmail } from '../../app/firebase/firebaseAuth'
import SocialLogin from './SocialLogin'

export default function LoginForm() {
  const dispatch = useDispatch()
  return (
    <ModalWrapper size="mini" header="Sign In">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values)
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ auth: 'Wrong  email or password' })
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form autoComplete="off" className="ui form">
            <TextInput name="email" type="email" placeholder="Your email" />
            <TextInput name="password" type="password" placeholder="Password" />
            {errors.auth && (
              <Label
                basic
                color="red"
                content={errors.auth}
                style={{ marginBottom: 10 }}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Sign In"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
