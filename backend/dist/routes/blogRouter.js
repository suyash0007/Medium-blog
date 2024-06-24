"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.userId
            }
        });
        res.json({
            id: blog.id
        });
    }
    catch (err) {
        return res.json({
            msg: "somthing went wrong"
        });
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma.post.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        return res.json({
            id: blog.id
        });
    }
    catch (err) {
        return res.json({
            msg: "somthing went wrong"
        });
    }
}));
router.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield prisma.post.findMany();
    return res.json({
        blogs
    });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield prisma.post.findFirst({
            where: {
                id: id
            }
        });
        return res.json({
            blog
        });
    }
    catch (err) {
        return res.json({
            msg: "somthing went wrong"
        });
    }
}));
exports.default = router;
