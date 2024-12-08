/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';

// const globalErrorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void = (err, req, res, next) => {
//   // Your error handling logic here
//   const statusCode = 500;
//   const message = err.message || 'Something went wrong!';

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next,
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';



  let errorSources: TErrorSources = [{
    path: '',
    message: 'Something went wrong',
  }];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "ami zod error" 
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;