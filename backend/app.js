require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require("express");
const userRouter = require("./routes/userRoutes")

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: ["http://localhost:3000"]
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ status: "success", message: "Your first app is working fine" });
})

app.use('/api/v1/user', userRouter);

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: "Route not found"
    })
})

app.listen(PORT, () => {
    console.log("app is up and running on port " + PORT)
})