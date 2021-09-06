require("dotenv").config()
const express = require("express");
const app = express();
//cors adalah proteksi untuk browser
const cors = require("cors");
const port = process.env.PORT || 4001
const routes = require("./routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", routes)
app.listen(port, () => {
    console.log(`The server is totally fine. It is running on port ${port}`)
})