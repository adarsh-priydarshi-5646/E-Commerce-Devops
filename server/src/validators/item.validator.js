const { z } = require("zod");

const createItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    quantity: z.number().int().min(0, "Quantity must be a non-negative integer"),
    inStock: z.boolean().optional()
});

const getItemSchema = z.object({
    itemId: z.string().length(24, "Invalid item ID")
});

module.exports = {
    createItemSchema,
    getItemSchema
};