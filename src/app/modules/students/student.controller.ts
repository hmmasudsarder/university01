import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
// import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.joi.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {

//     const { student: studentData } = req.body;


//     //data validation using zod


//     const zodparsedData = studentValidationSchema.parse(studentData)

//     // console.log(studentData);
//     // 

//     const result = await StudentService.createStudentIntoDB(zodparsedData);
//     res.status(200).json({
//       success: true,
//       message: 'Student is created succesfylly',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Somting is worning',
//       error: err,
//     });
//   }
// };



const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Student are retrieved succcessfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await StudentService.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is retrieved succcessfully',
    data: result,
  })
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is retrieved succcessfully',
  //   data: result,
  // });

});

const deletedStudent: RequestHandler = catchAsync(async (req, res,) => {
  const { studentId } = req.params;
  const result = await StudentService.deletedStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'Student is Deleted succcessfully',
    data: result,
  });
})

const updateStudent: RequestHandler = catchAsync(async (req, res,) => {
  const { studentId } = req.params;
  const result = await StudentService.deletedStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'Student is Updated succcessfully',
    data: result,
  });
})

export const StudentController = {
  deletedStudent,
  getAllStudents,
  updateStudent,
  getSingleStudent,
};
