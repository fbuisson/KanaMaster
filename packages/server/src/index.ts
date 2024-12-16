import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/index';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', // Autorise uniquement les requêtes depuis ce domaine
    credentials: true, // Permet d'envoyer les cookies avec les requêtes
  })
);

app.use(express.json());

app.use(cookieParser());
app.use('/api', routes);
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('Serving uploads from:', path.join(__dirname, '../uploads'));

console.log(__dirname);

console.log('Port: ', process.env.PORT);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
