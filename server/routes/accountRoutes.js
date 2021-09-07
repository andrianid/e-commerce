const router = require("express").Router()
const account = require("../controller/accountController")

router.get("/", (req,res) => {
    res.send("Account")
})
router.post("/register", account.checkAllBody, account.register)
router.post("/login", account.login)

router.get("/getAll", account.getAll)
router.get("/getOne/:id", account.getOne)
router.put("/update/:id", account.update)
router.delete("/delete/:id", account.delete)


module.exports = router