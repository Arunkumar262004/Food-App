import mongoose from 'mongoose';


export const connectdb = async()=>{
    await mongoose.connect('mongodb://localhost:27017/food_del').then(()=>console.log("DB connected !!!"));


}