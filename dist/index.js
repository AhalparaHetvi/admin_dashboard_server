"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // ✅ import cors
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
// ✅ Enable CORS for all origins (dev only)
app.use((0, cors_1.default)());
// or safer option (only allow your frontend)
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(cors({
//   origin: '*', // Allow all origins
// }));
app.use(express_1.default.json());
// Load Swagger YAML
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../swagger.yaml'));
// Setup Swagger endpoint
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Auth routes
app.use('/api/auth', authRoutes_1.default);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
