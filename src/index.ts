const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for all origins (dev only)
app.use(cors());

// or safer option (only allow your frontend)
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use(cors({
//   origin: '*', // Allow all origins
// }));

app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Setup Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
