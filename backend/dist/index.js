"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = require("./config/database");
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        server_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
};
startServer();
