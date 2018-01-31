module.exports = (err, req, res, next) => {
  next;
  console.error(err);
  if (err.name === 'OpenIdConnectError') {
    res.status(401).send({
      error: err.error,
      error_message: err.error_description,
    });
  } else {
    res.status(500).send({
      error_message: `${err}`,
    });
  }
}
