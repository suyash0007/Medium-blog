"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const blogMiddleware_1 = __importDefault(require("./middleware/blogMiddleware"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
app.use("/api/v1/user", userRouter_1.default);
app.use("/api/v1/blog", blogMiddleware_1.default, blogRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
