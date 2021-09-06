const router = require("express").Router()

router.get("/", (req,res) => {
    res.send("Item")
})

module.exports = router