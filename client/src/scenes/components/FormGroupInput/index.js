import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FormGroupInput = ({
  type,
  name,
  placeholder,
  size,
  onChange,
  error,
  value
}) => {
  return (
    <FormGroup>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        bsSize={size}
        onChange={onChange}
        className={classNames({'is-invalid': error})}
        value={value}
      />
      {
        error && (
          <div className='invalid-feedback'>{error}</div>
        )
      }
    </FormGroup>
  )
};

FormGroupInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  bsSize: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string
};

FormGroupInput.defaultProps = {
  type: 'text',
  bsSize: 'normal'
};

export default FormGroupInput;
