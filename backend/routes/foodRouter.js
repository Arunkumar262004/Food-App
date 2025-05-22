import express from 'express';
import {addfood,fetch_view_food,listfood,remove_food} from "../controllers/Foodcontroller.js";
import multer from 'multer'

const foodRouter = express.Router();

// image storage engine \
const storage = multer.diskStorage({    

    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
    
})
// console.log("Received file:", req.file);

const upload = multer({storage:storage})



foodRouter.post("/add",upload.single("image"),addfood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",remove_food);
foodRouter.get("/getid/:id",fetch_view_food)





export default foodRouter;
