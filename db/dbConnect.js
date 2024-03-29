import mongoose from "mongoose"

const dbURI = process.env.NEXT_PUBLIC_MONGODB_URI

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    mongoose.connect(dbURI, {
      useNewUrlParser: true
    });
    return handler(req, res);
  };
  
  export default connectDB