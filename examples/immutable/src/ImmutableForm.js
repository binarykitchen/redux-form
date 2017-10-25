import React from 'react'
import Immutable from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import validate from './validate'
import warn from './warn'

const renderField = ({
  rows,
  componentClass,
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  var fieldElement

  if (componentClass === 'textarea') {
    fieldElement = <textarea {...input} rows={rows} placeholder={label} />
  } else {
    fieldElement = <input {...input} type={type} placeholder={label} />
  }

  return (
    <div>
      <label>{label}</label>
      <div>
        { fieldElement }
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

const formatFavNumbers = (value) => {
  if (value) {
    return value.join('\n')
  } else {
    return ''
  }
}

const normalizeFavNumbers = (value) => {
  return Immutable.fromJS(value)
}

const parseFavNumbers = (value) => value.split(/\r\n|\r|\n/)

const ImmutableForm = props => {
const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="age" type="number" component={renderField} label="Age" />
      <Field
        name="fav-numbers"
        rows={5}
        component={renderField}
        componentClass="textarea"
        label="Favorite numbers"
        format={formatFavNumbers}
        normalize={normalizeFavNumbers}
        parse={parseFavNumbers}
      />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'immutableExample', // a unique identifier for this form
  initialValues: Immutable.fromJS({'age': '19', 'fav-numbers': ['7', '21']}),
  validate,
  warn
})(ImmutableForm)
