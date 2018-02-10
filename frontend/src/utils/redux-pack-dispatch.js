export default ({ dispatch }) => next => action => {
  const { promise } = action;
  if (typeof promise === 'function') {
    return next({...action, promise: promise(dispatch)});
  } else {
    return next(action);
  }
}
