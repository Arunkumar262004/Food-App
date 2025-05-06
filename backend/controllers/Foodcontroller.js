import FoodModel from '../models/Foodmodel.js';
import fs from 'fs';

// Add food item
const addfood = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        console.log("Received file:", req.file);  // Debugging log to check if file is uploaded

        const image_file_name = req.file.filename;

        const food = new FoodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_file_name
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.error("Add food error:", error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};



// all food
const listfood = async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}


// remove food 
const remove_food = async (req, res) => {
    try {
        const food = await FoodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await FoodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Image Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

export { addfood, listfood, remove_food };
