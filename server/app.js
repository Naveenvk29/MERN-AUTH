import expree from "express";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./Routes/user.routes.js";

const app = expree();

app.use(expree.json());
app.use(expree.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

export { app };
