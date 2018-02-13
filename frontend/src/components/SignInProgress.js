import React from 'react'
import PropTypes from 'prop-types'
import mountAware from '../utils/mountAware';
import Resource from '../models/Resource';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';

const SignInProgress = mountAware(({ signInRequest }) => (
  <div className="mt-5">
    <h2>Signing in...</h2>
    {signInRequest.isLoading ? <LoadingSpinner /> : null}
    {signInRequest.error ? <ErrorAlert error={signInRequest.error} /> : null}
  </div>
))

SignInProgress.propTypes = {
  signInRequest: PropTypes.instanceOf(Resource).isRequired,
}

export default SignInProgress
