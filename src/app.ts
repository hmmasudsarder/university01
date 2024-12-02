import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { StudentRoutes } from './app/modules/students/student.route';
// import { UserRoutes } from './app/modules/users/users.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
// import notFound from './app/middlewares/notFound';
const app: Application = express();
// const port = 3000

//parsers
app.use(express.json());
app.use(cors());

// app.use('/api/v1/students', StudentRoutes);
// app.use('/api/v1/users', UserRoutes);
app.use("/api/v1", router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
// app.use(notFound)
export default app;
