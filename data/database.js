import mongoose from "mongoose";

// db-conect
export const connectDb = () => {
  mongoose
    // 127.0.0.1 --- 💀💀💀
    .connect(process.env.MONGO_URI, { dbName: "backendapi" })
    .then((c) => console.log(`Database Connected ✅ with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
