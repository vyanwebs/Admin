"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartSchema = void 0;
const zod_1 = require("zod");
exports.createCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().nonempty("User ID is required"),
        productId: zod_1.z.string().nonempty("Product ID is required"),
        name: zod_1.z.string().nonempty("Name is required"),
        price: zod_1.z.number().positive("Price must be positive"),
        quantity: zod_1.z.number().int().positive("Quantity must be positive"),
        image: zod_1.z.string().url("Valid image URL required"),
    }),
});
