require("dotenv").config()
const { Cart, Item } = require("../models/");


class CartController {
    static addCart(req, res, next) {
        const {AccountId, ItemId, quantity} = req.body
        Cart.create({ AccountId, ItemId, quantity })
        .then((data) => {
            res.status(201).json({
                message: "Add Cart Success!",
                result: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                result: err,
            })
        })
    }

    static getAll(req, res, next) {
        Cart.findAll({
            include: Item
        })
        .then((data) => {
            res.status(200).json({
                message: "Get Data Success!",
                result: data
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                log: err
            })
        })
    }

    static getOne(req, res, next) {
        const cartId = req.params.id

        if (!cartId) {
            res.status(422).json({
                message: "Data couldn't be processed"
            })
        } else {
            Cart.findOne({
                where: { id: cartId },
            })
            .then((data) => {
                res.status(200).json({
                    message: "Get One success",
                    data: data
                })
            }).catch((err) => {
                res.status(500).json({
                        message: "Internal Server Error",
                        log: err
                    })
                })
        }
    }


    static update(req, res, next) {
        const { AccountId, ItemId, quantity } = req.body
        const cartId = req.params.id

        if (!cartId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Cart.findOne({ where: { id: cartId } })
                .then((data) => {
                    data.update({ AccountId, ItemId, quantity }, { where: { id: cartId } })
                        .then((updated) => {
                            res.status(200).json({
                                message: "Update Success",
                                result: updated
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                message: "Internal Server Error",
                                log: err
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Internal Server Error",
                        log: err
                    })
                })

        }
    }

    static delete(req, res, next) {
        const cartId = req.params.id

        if (!cartId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Account.destroy({ where: { id: cartId } })
                .then((data) => {
                    res.status(200).json({
                        message: "Delete Data Success",
                        result: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Delete failed",
                        log: err
                    })
                })
        }
    }

    static checkAllBody(req, res, next) {
        const { AccountId, ItemId, quantity } = req.body
        if (!AccountId || !ItemId || !quantity) {
            console.log("Failed to validate all body")
            res.status(422).json({
                message: "Unprocessable Data"
            })
        } else {
            console.log("Success")
            next()
        }
    }
}

module.exports = CartController