import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://arunkumar957877_db_user:Arun%40123@arsha-food-admin-db.jdywfvn.mongodb.net/foodapp?retryWrites=true&w=majority&appName=arsha-food-admin-db'
    );

    console.log("DB connected !!!");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};