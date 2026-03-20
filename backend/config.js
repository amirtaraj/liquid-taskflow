// Configuration loader for backend
import dotenv from 'dotenv';
dotenv.config();

export default {
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 5000
};
