import express from 'express';
import { config } from "dotenv"
import cors from 'cors';

import Route from './routes/index'
import connect from './configs/db'

config()
const app = express();

// MIDDLE WARES
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use('/api/v1/', Route)
app.get('/', (req, res) => res.status(200).send("Hello World"))
app.get('*', (req, res) => res.status(404).send("Page not found"))

// app.listen(5000, (req, res) => {console.log("listening on ", 5000)})
export const start = async () => {
    try {
      await connect();
      app.listen(process.env.PORT, () => {
        console.log(`REST API on http://localhost:${process.env.PORT}/`);
      });
    } catch (e) {
      console.error(e);
    }
  };
  
  start();
  
  export default app;