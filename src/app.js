import express from 'express';
import cors from 'cors';


import authorRoutes from './routes/authorRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
/* const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes'); */

const app = express();


app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/authors', authorRoutes);
/* app.use('/posts', postRoutes);
app.use('/comments', commentRoutes); */

app.get('/', (req, res) => {
  res.json({ message: "Henry Blog API is running successfully!" });
});

app.use(errorHandler);

export default app;