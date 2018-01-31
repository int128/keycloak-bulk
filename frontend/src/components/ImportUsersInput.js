import React from 'react'
import PropTypes from 'prop-types'

const ImportUsersInput = ({ value, onChange }) => (
  <form>
    <div className="form-group">
      <textarea className="form-control" defaultValue={value} rows={10}
        onChange={e => onChange(e.target.value)} />
    </div>
  </form>
)

ImportUsersInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ImportUsersInput
