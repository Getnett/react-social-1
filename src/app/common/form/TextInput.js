import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

export default function TextInput({ label, ...props }) {
  const [field, meata] = useField(props)
  return (
    <FormField error={meata.touched && !!meata.error}>
      <label>{label}</label>
      <input {...field} {...props} />

      {meata.touched && meata.error ? (
        <Label basic color="red">
          {meata.error}
        </Label>
      ) : null}
    </FormField>
  )
}
