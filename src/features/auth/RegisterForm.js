import { Form, Formik } from 'formik'
import { Button, Divider, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import TextInput from '../../app/common/form/TextInput'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { closeModal } from '../../app/common/modals/modalReducer'
import { signUpUsers } from '../../app/firebase/firebaseAuth'
import SocialLogin from './SocialLogin'

export default function RegisterForm() {
  const dispatch = useDispatch()
  return (
    <ModalWrapper size="mini" header="Sign Up">
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signUpUsers(values)
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ auth: error.message })
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form autoComplete="off" className="ui form">
            <TextInput name="displayName" type="text" placeholder="User Name" />
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
              content="Sign Up"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
