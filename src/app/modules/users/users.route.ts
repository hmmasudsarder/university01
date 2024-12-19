import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
// import  createStudentValidationSchema  from './../students/student.validation';
import { createStudentValidationSchema } from "../students/student.validation";
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';


const router = express.Router();

router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent);

router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty,
);

router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);

export const UserRoutes = router;