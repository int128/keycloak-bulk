export default ({ dispatch }) => next => action => {
  if (action !== undefined && typeof action.promise === 'function') {
    return next({...action, promise: action.promise(dispatch)});
  } else {
    return next(action);
  }
}
