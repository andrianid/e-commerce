const router = require("express").Router()
const item = require("../controller/itemController")

router.get("/", (req,res) => {
    res.send("Item")
})
router.post("/addItem", item.checkAllBody, item.addItem)
router.get("/getAll", item.getAll)
router.get("/getOne/:id", item.getOne)
router.put("/update/:id", item.update)
router.delete("/delete/:id", item.delete)


module.exports = router