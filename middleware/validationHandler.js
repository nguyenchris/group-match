exports.validationHandler = next => error => {
  if (error.isEmpty()) return;
  if (!next)
    throw new Error(
      error
        .array()
        .map(i => `'${i.param}' has ${i.msg}`)
        .join(' ')
    );
  else
    return next(
      new Error(
        error
          .array()
          // .map(i => `'${i.param}' has ${i.msg}`)
          .join('')
      )
    );
};