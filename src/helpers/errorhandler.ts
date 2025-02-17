import { Request, Response, NextFunction } from 'express';

interface ErrorResponse extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: ErrorResponse, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // check if response headers have already been sent to the client
  if (res.headersSent) {
    // if true, pass the error to the next error-handling middleware
    return next(err);
  }

  // set the status code of the response
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  res.status(statusCode); // set the status code of the response

  // log error stack trace to the console if not in production --> for debugging
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
