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

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin
};