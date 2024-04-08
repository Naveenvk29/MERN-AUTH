import expree from "express";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./Routes/user.routes.js";
// import { notFound, errorHandler } from "./Middleware/error.middleare.js";
const app = expree();

app.use(expree.json());
app.use(expree.urlencoded({ extended: true }));
app.use(cookieParser());
//
app.use("/api/users", userRoutes);
//
app.get("/", (req, res) => {
  res.send("Welcome");
});
// app.use(notFound);
// app.use(errorHandler);
export { app };
