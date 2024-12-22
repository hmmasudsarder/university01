import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../users/users.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
    }

    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );


    return {

    };
};

// const changePassword = async (
//     userData: JwtPayload,
//     payload: { oldPassword: string; newPassword: string },
// ) => {
//     // checking if the user is exist
//     const user = await User.isUserExistsByCustomId(userData.userId);

//     if (!user) {
//         throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//     }
//     // checking if the user is already deleted

//     const isDeleted = user?.isDeleted;

//     if (isDeleted) {
//         throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
//     }

//     // checking if the user is blocked

//     const userStatus = user?.status;

//     if (userStatus === 'blocked') {
//         throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
//     }

//     //checking if the password is correct

//     if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//         throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

//     //hash new password
//     const newHashedPassword = await bcrypt.hash(
//         payload.newPassword,
//         Number(config.bcrypt_salt_rounds),
//     );

//     await User.findOneAndUpdate(
//         {
//             id: userData.userId,
//             role: userData.role,
//         },
//         {
//             password: newHashedPassword,
//             needsPasswordChange: false,
//             passwordChangedAt: new Date(),
//         },
//     );

//     return null;
// };

// const refreshToken = async (token: string) => {
//     // checking if the given token is valid
//     const decoded = jwt.verify(
//         token,
//         config.jwt_refresh_secret as string,
//     ) as JwtPayload;

//     const { userId, iat } = decoded;

//     // checking if the user is exist
//     const user = await User.isUserExistsByCustomId(userId);

//     if (!user) {
//         throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//     }
//     // checking if the user is already deleted
//     const isDeleted = user?.isDeleted;

//     if (isDeleted) {
//         throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
//     }

//     // checking if the user is blocked
//     const userStatus = user?.status;

//     if (userStatus === 'blocked') {
//         throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
//     }

//     if (
//         user.passwordChangedAt &&
//         User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//     ) {
//         throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
//     }

//     const jwtPayload = {
//         userId: user.id,
//         role: user.role,
//     };

//     const accessToken = createToken(
//         jwtPayload,
//         config.jwt_access_secret as string,
//         config.jwt_access_expires_in as string,
//     );

//     return {
//         accessToken,
//     };
// };

export const AuthServices = {
    loginUser,
    // changePassword,
    // refreshToken,
};