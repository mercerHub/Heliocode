import express from "express"
import cors from "cors"

const app = express();

app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.json());


app.use(express.static("public"));



app.use(cors({
    origin: '*',
    credentials: true
}));


// importing routes

import allRoutes from "./routes/allRoutes"



app.use("/api/v1",allRoutes)



export default app;