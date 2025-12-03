"use strict";
// // dtos/aboutUs.dto.ts
// export interface AboutUsDto {
//   title: string;
//   content: string;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutUsSchema = void 0;
// // validators/aboutUs.validator.ts
// import { z } from "zod";
// export const aboutUsSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   content: z.string().min(1, "Content is required"),
// });
const zod_1 = require("zod");
exports.aboutUsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
});
