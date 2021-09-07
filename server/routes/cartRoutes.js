const router = require("express").Router()
const cart = require("../controller/cartController")

router.get("/", (req,res) => {
    res.send("Cart")
})
router.post("/addCart", cart.checkAllBody, cart.addCart)
router.get("/getAll", cart.getAll)
router.get("/getOne/:id", cart.getOne)
router.put("/update/:id", cart.update)
router.delete("/delete/:id", cart.delete)


module.exports = router