import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/index';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

// Middleware pour interpréter le JSON
app.use(express.json());

app.use(cookieParser());
// Assure-toi que cette ligne est bien présente pour enregistrer les routes utilisateur
app.use("/api",routes);

console.log("Port: ", process.env.PORT);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
