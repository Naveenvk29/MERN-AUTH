const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.statue(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let StatusCode = res.StatusCode == 200 ? 500 : res.statusCode;
  let messsage = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    StatusCode = 404;
    messsage = "Resource not found";
  }
  res.status(StatusCode).json({
    messsage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
