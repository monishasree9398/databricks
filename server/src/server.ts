import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3002;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'UNLOCK API Service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    adapter: process.env.USE_DATABRICKS === 'true' ? 'Databricks Lakehouse SQL' : 'High-Fidelity Mock Fixture'
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🚀 UNLOCK API Server is active on http://127.0.0.1:${PORT}`);
  console.log(`📡 Ready to serve Student & Faculty Digital Twin queries.\n`);
});
