import { useField } from 'formik'
import React from 'react'
import { FormField, Label, Select } from 'semantic-ui-react'
export default function SelectInput({ label, ...props }) {
  const [field, meata, helpers] = useField(props)
  return (
    <FormField error={meata.touched && !!meata.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meata.touched && meata.error ? (
        <Label basic color="red">
          {meata.error}
        </Label>
      ) : null}
    </FormField>
  )
}
