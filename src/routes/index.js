import express from 'express';
import CountryRouter from './countries/index'
import UserRouter from './userRoute/index'
import { rateLimiterMiddleware } from '../middlewares/requestLimit'

const Router = express.Router();
// Router.use('/auth', AuthRouter);
// Router.use('/countries', CountryRouter);
Router.use('/country', rateLimiterMiddleware, CountryRouter);
Router.use('/user', UserRouter);
// Router.use('/login', UserRouter);


export default Router;