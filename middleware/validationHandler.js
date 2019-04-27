exports.validationHandler = next => error => {
  if (error.isEmpty()) return;
  if (!next)
    throw new Error(
      error
        .array()[0].msg
    )
  else
    return next(
      new Error(
        error.array()[0].msg
      )
    )
};
