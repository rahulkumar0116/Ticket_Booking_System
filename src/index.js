import { app } from "./app.js";
import connectDB from "./Db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Listing on Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed...!", error);
  });
