import { useField, useFormikContext } from 'formik'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { FormField, Label } from 'semantic-ui-react'

import 'react-datepicker/dist/react-datepicker.css'

export default function DatePicker({ label, ...props }) {
  const { setFieldValue } = useFormikContext()
  const [field, meata] = useField(props)
  return (
    <FormField error={meata.touched && !!meata.error}>
      <label>{label}</label>
      <ReactDatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meata.touched && meata.error ? (
        <Label basic color="red">
          {meata.error}
        </Label>
      ) : null}
    </FormField>
  )
}
