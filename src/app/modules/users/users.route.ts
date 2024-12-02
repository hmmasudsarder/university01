import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
// import  createStudentValidationSchema  from './../students/student.validation';
import { createStudentValidationSchema } from "../students/student.validation";


const router = express.Router();

router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;