import express from 'express';
import { searchByName } from "../../controllers/country/getCountry"
import { protect } from "../../middlewares/authentication/auth"

const CountryRouter = express.Router();

CountryRouter.get('/:name', protect, searchByName)

export default CountryRouter;