
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../modules/utils/catchAsync'
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/users/users.model';

const auth = () => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const token = req.headers.authorization;

            // checking if the token is missing
            if (!token) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
            }
            // checking if the given token is valid
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;


            const { role, userId, iat } = decoded;

            // checking if the user is exist
            const user = await User.isUserExistsByCustomId(userId);
        });
}

export default auth
