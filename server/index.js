import dotenv from "dotenv";
import { app } from "./app.js";
import connectDb from "./DB/connect.DB.js";

dotenv.config();

connectDb()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )

  .catch((err) => console.log(err));
