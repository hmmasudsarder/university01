import { UserServices } from './users.service';
import sendResponse from '../utils/sendResponse';
import {
  StatusCodes,
} from 'http-status-codes';
import catchAsync from '../utils/catchAsync';





const createStudent = catchAsync(async (
  req,
  res
) => {
  const { password, student: studentData } = req.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: Number(StatusCodes.OK),
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "create student successfully",
  //   data: result
  // })
});

export const UserControllers = {
  createStudent,
};