// import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './users.service';
import sendResponse from '../utils/sendResponse';
import { STATUS_CODES } from 'http';
// import sendResponse from '../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // sendResponse(res, {
    //   statusCode: Number(STATUS_CODES.OK),
    //   success: true,
    //   message: 'Student is created succesfully',
    //   data: result,
    // });
    
    res.status(200).json({
      success: true,
      message: "create student successfully",
      data: result
    })
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};