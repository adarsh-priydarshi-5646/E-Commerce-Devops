const item = require('../models/item.model');
const { createItemSchema, getItemSchema } = require('../validators/item.validator');

const createItem = async (req, res) => {
    try {
        const { name, description, price, quantity, inStock } = createItemSchema.parse(req.body);

        const newItem = await item.create({
            name,
            description,
            price,
            quantity,
            inStock
        });

        res.status(201).json({
            message: "Item created successfully",
            itemId: newItem._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating item",
            error: error.message
        });
    }
};

const getItems = async (req, res) => {
    try {
        const items = await item.find();
        if (items.length === 0) {
            return res.status(404).json({
                message: "No items found"
            });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching items",
            error: error.message
        });
    }
};

const getItemById = async (req, res) => {
    try {
        const { itemId } = getItemSchema.parse(req.params);
        const itemData = await item.findById(itemId);
        if (!itemData) {
            return res.status(404).json({
                message: "Item not found"
            });
        }
        res.status(200).json(itemData);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching item",
            error: error.message
        });
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById
};