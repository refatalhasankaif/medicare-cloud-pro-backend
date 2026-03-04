import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', IndexRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is working',
  });
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;