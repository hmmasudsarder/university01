import express from 'express';
import { StudentController } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

//will call controller
// router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentController.updateStudent);
router.delete('/:studentId', StudentController.deletedStudent);

export const StudentRoutes = router;
