/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from 'express';

import { Request, Response, NextFunction } from 'express';

const globalErrorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void = (err, req, res, next) => {
  // Your error handling logic here
  const statusCode = 500;
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const statusCode = 500;
//   const message = err.message || 'Something went wrong!';

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };

export default globalErrorHandler;