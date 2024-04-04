import expree from "express"
import cookieParser from "cookie-parser"
import path from "path"

const app = expree()

app.use(cookieParser())

export { app}