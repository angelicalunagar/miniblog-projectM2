import express from 'express';
import cors from 'cors';


import authorRoutes from './routes/authorRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import postRoutes from './routes/postRoutes.js';
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';


const app = express();
const swaggerDocument = YAML.load("./openapi.yaml");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount Routes
app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
/* app.use('/comments', commentRoutes); */

app.get('/', (req, res) => {
  res.json({ message: "Henry Blog API is running successfully!" });
});

app.use(errorHandler);

export default app;