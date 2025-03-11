const Validation = schema => (req, res, next) => {
  const { body } = req;
  const { error } = schema.validate(body);
  if (error) {
    console.error(`Validation Error : ${error.message}`, error);
    res.status(422).json({
      err: 'validation error',
    });
    return;
  }
  next();
};
module.exports = { Validation };