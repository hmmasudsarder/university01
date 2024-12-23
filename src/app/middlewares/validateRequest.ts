import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../modules/utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

      // validation check
      //if everything allright next() ->
      await schema.parseAsync({
        body: req.body,
      });

      next();
    }
  )

};

export default validateRequest;